
    // Toggle Ingredients
    const toggleBtn = document.getElementById('toggle-ingredients');
    const ingredientsList = document.getElementById('ingredients-list');
    let ingredientsVisible = false;
    toggleBtn.onclick = function() {
      ingredientsVisible = !ingredientsVisible;
      ingredientsList.classList.toggle('hidden');
      toggleBtn.textContent = ingredientsVisible ? 'Hide Ingredients' : 'Show Ingredients';
    };

    // Step-by-step with progress bar
    const steps = document.querySelectorAll('#steps-list li');
    const startBtn = document.getElementById('start-cooking');
    const progress = document.getElementById('progress');
    let currentStep = 0;
    let timerInterval = null;
    let timerSection = document.getElementById('timer-section');
    let timer = 0;

    function highlightStep(idx) {
      steps.forEach((step, i) => {
        step.style.background = i === idx ? '#d1eaff' : '';
        step.style.color = i === idx ? '#007bff' : '';
        step.style.fontWeight = i === idx ? '700' : '';
      });
      progress.style.width = ((idx+1)/steps.length*100) + '%';
    }

    function resetSteps() {
      steps.forEach(step => {
        step.style.background = '';
        step.style.color = '';
        step.style.fontWeight = '';
      });
      progress.style.width = '0%';
      currentStep = 0;
      startBtn.textContent = 'Start Cooking';
      clearInterval(timerInterval);
      timerSection.textContent = '';
    }

    startBtn.onclick = function() {
      if (currentStep === 0) {
        highlightStep(0);
        startBtn.textContent = 'Next';
        timer = 30 * 60; // 30 min timer for demo
        timerSection.textContent = 'Time left: 30:00';
        timerInterval = setInterval(() => {
          timer--;
          let min = Math.floor(timer/60);
          let sec = timer%60;
          timerSection.textContent = `Time left: ${min}:${sec.toString().padStart(2,'0')}`;
          if (timer <= 0) {
            clearInterval(timerInterval);
            timerSection.textContent = 'Done!';
          }
        }, 1000);
      } else if (currentStep < steps.length) {
        highlightStep(currentStep);
      }
      currentStep++;
      if (currentStep > steps.length) {
        resetSteps();
      }
    };

    // Print button
    document.getElementById('print-btn').onclick = function() {
      window.print();
    };