document.addEventListener('DOMContentLoaded', () => {
    // Input Type Switching
    const radioButtons = document.querySelectorAll('input[name="secretType"]');
    const inputSections = {
        text: document.getElementById('input-text'),
        number: document.getElementById('input-number'),
        file: document.getElementById('input-file'),
        audio: document.getElementById('input-audio')
    };

    radioButtons.forEach(radio => {
        radio.addEventListener('change', (e) => {
            const type = e.target.value;
            // Hide all
            Object.values(inputSections).forEach(sec => sec.classList.add('hidden'));
            // Show selected
            inputSections[type].classList.remove('hidden');
        });
    });

    // Audio Recording
    let mediaRecorder;
    let audioChunks = [];
    let audioBlob;

    const recordBtn = document.getElementById('recordBtn');
    const stopBtn = document.getElementById('stopBtn');
    const recordingStatus = document.getElementById('recordingStatus');
    const audioPreview = document.getElementById('audioPreview');

    recordBtn.addEventListener('click', async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            mediaRecorder = new MediaRecorder(stream);

            mediaRecorder.start();
            audioChunks = [];

            recordBtn.disabled = true;
            stopBtn.disabled = false;
            recordingStatus.textContent = "Recording...";
            audioPreview.classList.add('hidden');
            audioBlob = null;

            mediaRecorder.addEventListener("dataavailable", event => {
                audioChunks.push(event.data);
            });

            mediaRecorder.addEventListener("stop", () => {
                audioBlob = new Blob(audioChunks, { type: 'audio/webm' });
                const audioUrl = URL.createObjectURL(audioBlob);
                audioPreview.src = audioUrl;
                audioPreview.classList.remove('hidden');

                recordBtn.disabled = false;
                stopBtn.disabled = true;
                recordingStatus.textContent = "Recorded";

                // Stop all tracks to release microphone
                stream.getTracks().forEach(track => track.stop());
            });
        } catch (err) {
            console.error("Error accessing microphone:", err);
            alert("Could not access microphone. Please ensure you have granted permission.");
        }
    });

    stopBtn.addEventListener('click', () => {
        if (mediaRecorder && mediaRecorder.state !== 'inactive') {
            mediaRecorder.stop();
        }
    });

    // Pattern Lock Implementation
    class PatternLock {
        constructor(canvasId, inputId) {
            this.canvas = document.getElementById(canvasId);
            this.ctx = this.canvas.getContext('2d');
            this.input = document.getElementById(inputId);
            this.dots = [];
            this.lines = [];
            this.isDrawing = false;
            this.width = this.canvas.width;
            this.height = this.canvas.height;
            this.radius = 10;
            this.gap = 80;
            this.offset = 70;

            this.initDots();
            this.addEventListeners();
            this.draw();
        }

        initDots() {
            for (let r = 0; r < 3; r++) {
                for (let c = 0; c < 3; c++) {
                    this.dots.push({
                        x: this.offset + c * this.gap,
                        y: this.offset + r * this.gap,
                        id: r * 3 + c,
                        active: false
                    });
                }
            }
        }

        draw() {
            this.ctx.clearRect(0, 0, this.width, this.height);

            // Draw lines
            if (this.lines.length > 0) {
                this.ctx.beginPath();
                this.ctx.strokeStyle = '#3b82f6';
                this.ctx.lineWidth = 4;
                this.ctx.lineCap = 'round';
                this.ctx.lineJoin = 'round';

                const firstDot = this.dots.find(d => d.id === this.lines[0]);
                this.ctx.moveTo(firstDot.x, firstDot.y);

                for (let i = 1; i < this.lines.length; i++) {
                    const dot = this.dots.find(d => d.id === this.lines[i]);
                    this.ctx.lineTo(dot.x, dot.y);
                }

                if (this.isDrawing && this.currentPos) {
                    this.ctx.lineTo(this.currentPos.x, this.currentPos.y);
                }

                this.ctx.stroke();
            }

            // Draw dots
            this.dots.forEach(dot => {
                this.ctx.beginPath();
                this.ctx.arc(dot.x, dot.y, this.radius, 0, Math.PI * 2);
                this.ctx.fillStyle = this.lines.includes(dot.id) ? '#3b82f6' : '#4b5563';
                this.ctx.fill();

                // Outer ring for active dots
                if (this.lines.includes(dot.id)) {
                    this.ctx.beginPath();
                    this.ctx.arc(dot.x, dot.y, this.radius * 2, 0, Math.PI * 2);
                    this.ctx.strokeStyle = 'rgba(59, 130, 246, 0.3)';
                    this.ctx.lineWidth = 2;
                    this.ctx.stroke();
                }
            });
        }

        getMousePos(e) {
            const rect = this.canvas.getBoundingClientRect();
            const clientX = e.touches ? e.touches[0].clientX : e.clientX;
            const clientY = e.touches ? e.touches[0].clientY : e.clientY;
            return {
                x: clientX - rect.left,
                y: clientY - rect.top
            };
        }

        handleStart(e) {
            e.preventDefault();
            this.isDrawing = true;
            this.lines = [];
            this.input.value = '';
            this.handleMove(e);
        }

        handleMove(e) {
            if (!this.isDrawing) return;
            e.preventDefault();
            const pos = this.getMousePos(e);
            this.currentPos = pos;

            this.dots.forEach(dot => {
                const dx = pos.x - dot.x;
                const dy = pos.y - dot.y;
                if (Math.sqrt(dx * dx + dy * dy) < 30) {
                    if (!this.lines.includes(dot.id)) {
                        // Check for jumps (e.g. 0 to 2, should include 1)
                        if (this.lines.length > 0) {
                            const last = this.lines[this.lines.length - 1];
                            const curr = dot.id;
                            const mid = (last + curr) / 2;
                            if (Number.isInteger(mid) &&
                                Math.abs((last % 3) - (curr % 3)) !== 1 && // Not adjacent horizontally
                                Math.abs(Math.floor(last / 3) - Math.floor(curr / 3)) !== 1 // Not adjacent vertically
                            ) {
                                // Diagonal or straight jump check could be more complex, 
                                // but simple midpoint check covers 0-2, 0-8, 2-6, 6-8, 1-7, 3-5
                                // Actually, let's just keep it simple: if midpoint is a valid dot and not visited, add it.
                                // 0(0,0) -> 2(0,2) mid 1(0,1)
                                // 0(0,0) -> 8(2,2) mid 4(1,1)
                                const midDot = this.dots.find(d => d.id === mid);
                                if (midDot && !this.lines.includes(mid)) {
                                    this.lines.push(mid);
                                }
                            }
                        }
                        this.lines.push(dot.id);
                        // Vibration feedback if supported
                        if (navigator.vibrate) navigator.vibrate(20);
                    }
                }
            });

            this.draw();
        }

        handleEnd(e) {
            if (!this.isDrawing) return;
            e.preventDefault();
            this.isDrawing = false;
            this.currentPos = null;
            this.draw();
            this.input.value = this.lines.join('-');
            console.log('Pattern:', this.input.value);
        }

        addEventListeners() {
            // Mouse
            this.canvas.addEventListener('mousedown', this.handleStart.bind(this));
            document.addEventListener('mousemove', this.handleMove.bind(this));
            document.addEventListener('mouseup', this.handleEnd.bind(this));

            // Touch
            this.canvas.addEventListener('touchstart', this.handleStart.bind(this));
            this.canvas.addEventListener('touchmove', this.handleMove.bind(this));
            this.canvas.addEventListener('touchend', this.handleEnd.bind(this));
        }
    }

    // Initialize Pattern Lock
    const patternLock = new PatternLock('patternLockCanvas', 'encodePassword');

    // Encode Form
    const encodeForm = document.getElementById('encodeForm');
    const encodeResult = document.getElementById('encodeResult');
    const downloadLink = document.getElementById('downloadLink');

    encodeForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const fileInput = document.getElementById('encodeFile');
        const password = document.getElementById('encodePassword').value;
        const algorithm = document.getElementById('algorithm').value;
        const type = document.querySelector('input[name="secretType"]:checked').value;

        if (!fileInput.files[0]) return alert('Please select a cover image.');
        if (!password || password.length < 3) return alert('Please draw a pattern (connect at least 2 dots).');

        const formData = new FormData();
        formData.append('image', fileInput.files[0]);
        formData.append('password', password);
        formData.append('algorithm', algorithm);
        formData.append('type', type);

        if (type === 'text') {
            const text = document.getElementById('secretText').value;
            if (!text) return alert('Please enter secret text.');
            formData.append('content', text);
        } else if (type === 'number') {
            const number = document.getElementById('secretNumber').value;
            if (!number) return alert('Please enter a secret number.');
            formData.append('content', number);
        } else if (type === 'file') {
            const secretFile = document.getElementById('secretFile').files[0];
            if (!secretFile) return alert('Please select a secret file.');
            formData.append('secretFile', secretFile);
        } else if (type === 'audio') {
            if (!audioBlob) return alert('Please record a voice message.');
            formData.append('audioFile', audioBlob, 'recording.webm');
        }

        try {
            const response = await fetch('/encode', {
                method: 'POST',
                body: formData
            });

            if (!response.ok) {
                const err = await response.json();
                throw new Error(err.error || 'Encoding failed');
            }

            const data = await response.json();

            // Handle base64 image
            const byteCharacters = atob(data.stegoImageBase64);
            const byteNumbers = new Array(byteCharacters.length);
            for (let i = 0; i < byteCharacters.length; i++) {
                byteNumbers[i] = byteCharacters.charCodeAt(i);
            }
            const byteArray = new Uint8Array(byteNumbers);
            const blob = new Blob([byteArray], { type: data.mimeType });
            const url = URL.createObjectURL(blob);

            downloadLink.href = url;

            // Show debug info if available
            if (data.debug) {
                console.log('Debug Info:', data.debug);
                const debugDiv = document.createElement('div');
                debugDiv.innerHTML = `
                    <h4>Debug Info</h4>
                    <pre>${JSON.stringify(data.debug, null, 2)}</pre>
                `;
                // Clear previous debug info if any
                const existingDebug = encodeResult.querySelector('div');
                if (existingDebug) existingDebug.remove();
                encodeResult.appendChild(debugDiv);
            }

            encodeResult.classList.remove('hidden');
        } catch (error) {
            alert(error.message);
        }
    });
});
