AFRAME.registerComponent('two-minute-timer', {
    schema: {
        startTime: { type: 'int', default: -1 },
        timerText: { type: 'string', default: '#timerText' } // Selector for the text entity
    },

    init: function () {
        this.el.addEventListener('collide', this.startTimer.bind(this));
        this.textElement = document.querySelector(this.data.timerText);
        if (!this.textElement) {
            console.warn('Text element for timer not found!');
        }
    },

    tick: function (time, timeDelta) {
        if (this.data.startTime < 0) {
            return; // Timer not started yet
        }

        let elapsed = time - this.data.startTime;
        let remaining = Math.max(0, 120000 - elapsed); // Remaining time in milliseconds

        this.updateTimerText(remaining);

        if (elapsed >= 120000) { // 120000 milliseconds = 2 minutes
            this.timerEnded();
        }
    },

    startTimer: function () {
        if (this.data.startTime < 0) {
            this.data.startTime = this.el.sceneEl.time;
            console.log("Timer started!");
        }
    },

    timerEnded: function () {
        console.log("Two minutes have passed!");
        this.data.startTime = -1;
        this.updateTimerText(0);
        // Additional logic for timer end
    },

    updateTimerText: function (milliseconds) {
        if (!this.textElement) {
            return;
        }
        let seconds = Math.floor(milliseconds / 1000);
        let text = seconds > 0 ? `${seconds} seconds remaining` : 'Time is up!';
        this.textElement.setAttribute('text', 'value', text);
    }
});