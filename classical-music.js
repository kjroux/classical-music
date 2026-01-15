// Intro to Classical Music - Interactive Syllabus Tracker
// Handles progress tracking, listening sessions, notes saving, and UI interactions

class ClassicalMusicTracker {
    constructor() {
        this.storageKeyNotes = 'classicalMusicSessionNotes';
        this.storageKeyProgress = 'classicalMusicSessionProgress';
        this.totalWeeks = 14; // Total number of pieces
        this.additionalListenCount = {}; // Track additional listens per week
        this.init();
    }

    init() {
        this.loadProgress();
        this.loadNotes();
        this.attachEventListeners();
        this.updateOverallProgress();
    }

    // Load listening session progress from localStorage
    loadProgress() {
        const savedProgress = localStorage.getItem(this.storageKeyProgress);
        if (savedProgress) {
            const progress = JSON.parse(savedProgress);

            // Load session checkboxes
            Object.keys(progress.sessions || {}).forEach(sessionId => {
                const checkbox = document.getElementById(sessionId);
                if (checkbox && progress.sessions[sessionId]) {
                    checkbox.checked = true;
                    this.updateSessionStyle(sessionId, true);
                }
            });

            // Load additional listens
            if (progress.additionalListens) {
                Object.keys(progress.additionalListens).forEach(weekId => {
                    const listens = progress.additionalListens[weekId];
                    listens.forEach((listenData, index) => {
                        this.createAdditionalListenUI(weekId, index + 4, listenData.checked, listenData.notes);
                    });
                });
            }
        }

        // Update all week checkboxes based on third listen completion
        this.updateAllWeekCheckboxes();
    }

    // Save all progress to localStorage
    saveProgress() {
        const progress = {
            sessions: {},
            additionalListens: {}
        };

        // Save session checkboxes
        const checkboxes = document.querySelectorAll('.session-checkbox');
        checkboxes.forEach(checkbox => {
            progress.sessions[checkbox.id] = checkbox.checked;
        });

        // Save additional listens
        document.querySelectorAll('.week-card').forEach(weekCard => {
            const weekId = weekCard.dataset.weekId;
            const additionalContainer = weekCard.querySelector('.additional-listens');
            if (additionalContainer) {
                const additionalSessions = additionalContainer.querySelectorAll('.listen-session');
                if (additionalSessions.length > 0) {
                    progress.additionalListens[weekId] = [];
                    additionalSessions.forEach(session => {
                        const checkbox = session.querySelector('.session-checkbox');
                        const textarea = session.querySelector('.session-notes');
                        progress.additionalListens[weekId].push({
                            checked: checkbox ? checkbox.checked : false,
                            notes: textarea ? textarea.value : ''
                        });
                    });
                }
            }
        });

        localStorage.setItem(this.storageKeyProgress, JSON.stringify(progress));
        this.updateAllWeekCheckboxes();
        this.updateOverallProgress();
    }

    // Load notes from localStorage
    loadNotes() {
        const savedNotes = localStorage.getItem(this.storageKeyNotes);
        if (savedNotes) {
            const notes = JSON.parse(savedNotes);
            Object.keys(notes).forEach(textareaId => {
                const textarea = document.getElementById(textareaId);
                if (textarea && notes[textareaId]) {
                    textarea.value = notes[textareaId];
                }
            });
        }
    }

    // Save notes to localStorage
    saveNotes(textarea) {
        const savedNotes = localStorage.getItem(this.storageKeyNotes);
        const notes = savedNotes ? JSON.parse(savedNotes) : {};

        // Generate or use existing ID for textarea
        if (!textarea.id) {
            textarea.id = 'notes-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9);
        }

        notes[textarea.id] = textarea.value;
        localStorage.setItem(this.storageKeyNotes, JSON.stringify(notes));
    }

    // Update overall progress bar and text
    updateOverallProgress() {
        const weekCards = document.querySelectorAll('.week-card');
        let completedCount = 0;

        weekCards.forEach(card => {
            const checkbox = card.querySelector('.week-checkbox');
            if (checkbox && checkbox.checked) {
                completedCount++;
            }
        });

        const progressPercentage = (completedCount / this.totalWeeks) * 100;
        const progressBar = document.getElementById('overall-progress');
        const weeksCompletedSpan = document.getElementById('weeks-completed');

        if (progressBar) {
            progressBar.style.width = `${progressPercentage}%`;
        }

        if (weeksCompletedSpan) {
            weeksCompletedSpan.textContent = completedCount;
        }
    }

    // Check if third listen is complete for a week
    isThirdListenComplete(weekId) {
        const thirdListenCheckbox = document.getElementById(`${weekId}-listen-3`);
        return thirdListenCheckbox && thirdListenCheckbox.checked;
    }

    // Update all week checkboxes based on third listen completion
    updateAllWeekCheckboxes() {
        document.querySelectorAll('.week-card').forEach(weekCard => {
            const weekId = weekCard.dataset.weekId;
            const weekCheckbox = weekCard.querySelector('.week-checkbox');

            if (weekCheckbox) {
                const thirdComplete = this.isThirdListenComplete(weekId);
                weekCheckbox.checked = thirdComplete;
                this.updateWeekCardStyle(weekId, thirdComplete);
            }
        });
    }

    // Update week card visual style when completed
    updateWeekCardStyle(weekId, isCompleted) {
        const weekCard = document.querySelector(`[data-week-id="${weekId}"]`);
        if (weekCard) {
            if (isCompleted) {
                weekCard.classList.add('completed');
            } else {
                weekCard.classList.remove('completed');
            }
        }
    }

    // Update session visual style when completed
    updateSessionStyle(sessionId, isCompleted) {
        const checkbox = document.getElementById(sessionId);
        if (checkbox) {
            const session = checkbox.closest('.listen-session');
            if (session) {
                if (isCompleted) {
                    session.classList.add('completed');
                } else {
                    session.classList.remove('completed');
                }
            }
        }
    }

    // Convert number to ordinal word (1 -> "First", 2 -> "Second", etc.)
    getOrdinalWord(num) {
        const ordinals = [
            '', 'First', 'Second', 'Third', 'Fourth', 'Fifth',
            'Sixth', 'Seventh', 'Eighth', 'Ninth', 'Tenth',
            'Eleventh', 'Twelfth', 'Thirteenth', 'Fourteenth', 'Fifteenth'
        ];
        return ordinals[num] || `${num}th`;
    }

    // Create additional listen UI
    createAdditionalListenUI(weekId, sessionNumber, isChecked = false, notesValue = '') {
        const additionalContainer = document.getElementById(`${weekId}-additional`);
        if (!additionalContainer) return;

        const sessionDiv = document.createElement('div');
        sessionDiv.className = 'listen-session';
        sessionDiv.dataset.session = sessionNumber;

        const sessionId = `${weekId}-listen-${sessionNumber}`;
        const textareaId = `${sessionId}-notes`;
        const ordinalWord = this.getOrdinalWord(sessionNumber);

        sessionDiv.innerHTML = `
            <div class="session-header">
                <input type="checkbox" class="session-checkbox" id="${sessionId}" ${isChecked ? 'checked' : ''}>
                <label for="${sessionId}"><strong>${ordinalWord} Listen</strong> - Additional reflection</label>
            </div>
            <textarea class="session-notes" id="${textareaId}" placeholder="What new details or perspectives emerged?">${notesValue}</textarea>
        `;

        additionalContainer.appendChild(sessionDiv);

        // Add event listeners to the new elements
        const checkbox = sessionDiv.querySelector('.session-checkbox');
        const textarea = sessionDiv.querySelector('.session-notes');

        checkbox.addEventListener('change', () => {
            this.updateSessionStyle(sessionId, checkbox.checked);
            this.saveProgress();
        });

        textarea.addEventListener('blur', () => {
            this.saveNotes(textarea);
        });

        if (isChecked) {
            this.updateSessionStyle(sessionId, true);
        }
    }

    // Attach all event listeners
    attachEventListeners() {
        // Expand/collapse week cards
        document.querySelectorAll('.week-header').forEach(header => {
            header.addEventListener('click', (e) => {
                // Don't toggle if clicking checkbox or label
                if (e.target.classList.contains('week-checkbox') ||
                    e.target.tagName === 'LABEL') {
                    return;
                }

                const weekCard = header.closest('.week-card');
                weekCard.classList.toggle('expanded');
            });
        });

        // Session checkboxes
        document.querySelectorAll('.session-checkbox').forEach(checkbox => {
            checkbox.addEventListener('change', () => {
                this.updateSessionStyle(checkbox.id, checkbox.checked);
                this.saveProgress();
            });
        });

        // Session notes auto-save
        document.querySelectorAll('.session-notes').forEach(textarea => {
            textarea.addEventListener('blur', () => {
                this.saveNotes(textarea);
            });
        });

        // Add additional listen buttons
        document.querySelectorAll('.add-listen-btn').forEach(button => {
            button.addEventListener('click', () => {
                const weekId = button.dataset.week;
                if (!this.additionalListenCount[weekId]) {
                    this.additionalListenCount[weekId] = 3; // Start after listen 3
                }
                this.additionalListenCount[weekId]++;
                this.createAdditionalListenUI(weekId, this.additionalListenCount[weekId]);
                this.saveProgress();
            });
        });

        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            // Ctrl/Cmd + S to save notes in focused textarea
            if ((e.ctrlKey || e.metaKey) && e.key === 's') {
                const activeElement = document.activeElement;
                if (activeElement.classList.contains('session-notes')) {
                    e.preventDefault();
                    this.saveNotes(activeElement);
                    this.showSaveIndicator(activeElement);
                }
            }
        });
    }

    // Show save indicator
    showSaveIndicator(textarea) {
        const originalBorder = textarea.style.borderColor;
        textarea.style.borderColor = '#27ae60';
        setTimeout(() => {
            textarea.style.borderColor = originalBorder;
        }, 500);
    }

    // Export progress and notes as JSON
    exportData() {
        const progress = localStorage.getItem(this.storageKeyProgress);
        const notes = localStorage.getItem(this.storageKeyNotes);

        const exportData = {
            progress: progress ? JSON.parse(progress) : {},
            notes: notes ? JSON.parse(notes) : {},
            exportDate: new Date().toISOString()
        };

        const dataStr = JSON.stringify(exportData, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(dataBlob);

        const link = document.createElement('a');
        link.href = url;
        link.download = `classical-music-progress-${new Date().toISOString().split('T')[0]}.json`;
        link.click();

        URL.revokeObjectURL(url);
    }

    // Import progress and notes from JSON
    importData(jsonData) {
        try {
            const data = JSON.parse(jsonData);

            if (data.progress) {
                localStorage.setItem(this.storageKeyProgress, JSON.stringify(data.progress));
            }

            if (data.notes) {
                localStorage.setItem(this.storageKeyNotes, JSON.stringify(data.notes));
            }

            location.reload();
        } catch (error) {
            alert('Error importing data. Please check the file format.');
            console.error('Import error:', error);
        }
    }

    // Clear all data
    clearAllData() {
        if (confirm('Are you sure you want to clear all progress and notes? This cannot be undone.')) {
            localStorage.removeItem(this.storageKeyProgress);
            localStorage.removeItem(this.storageKeyNotes);
            location.reload();
        }
    }
}

// Initialize the tracker when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.musicTracker = new ClassicalMusicTracker();

    // Add export/import functionality (can be triggered from console or added to UI)
    window.exportProgress = () => window.musicTracker.exportData();
    window.clearProgress = () => window.musicTracker.clearAllData();

    console.log('Intro to Classical Music Tracker initialized!');
    console.log('Available commands:');
    console.log('- exportProgress(): Export your progress and notes');
    console.log('- clearProgress(): Clear all data');
});
