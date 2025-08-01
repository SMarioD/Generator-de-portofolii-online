document.addEventListener('DOMContentLoaded', () => {
    const portfolioForm = document.querySelector('.generator-form');
    const addProjectBtn = document.getElementById('add-project-btn');
    const projectsContainer = document.getElementById('projects-container');
    const saveDataToLocalStorage = () => {
        const currentData = {
            fullName: document.getElementById('fullName').value,
            jobTitle: document.getElementById('jobTitle').value,
            bio: document.getElementById('bio').value,
            skills: document.getElementById('skills').value,
            projects: Array.from(document.querySelectorAll('.project-form-entry')).map(node => ({
                title: node.querySelector('.project-title').value,
                description: node.querySelector('.project-desc').value,
                link: node.querySelector('.project-link').value
            }))
        };
        localStorage.setItem('portfolioFormData', JSON.stringify(currentData));
    };

    const loadDataFromLocalStorage = () => {
        const savedData = localStorage.getItem('portfolioFormData');
        if (savedData) {
            const data = JSON.parse(savedData);
            document.getElementById('fullName').value = data.fullName || '';
            document.getElementById('jobTitle').value = data.jobTitle || '';
            document.getElementById('bio').value = data.bio || '';
            document.getElementById('skills').value = data.skills || '';
            if (data.projects && data.projects.length > 0) {
                projectsContainer.innerHTML = '';
                data.projects.forEach(project => {
                    const projectEntry = document.createElement('div');
                    projectEntry.classList.add('project-form-entry');
                    projectEntry.innerHTML = `
                        <hr style="margin: 2rem 0;">
                        <div class="form-group"><label>Titlu Proiect</label><input type="text" class="project-title" value="${project.title || ''}"></div>
                        <div class="form-group"><label>Descriere Proiect</label><textarea class="project-desc">${project.description || ''}</textarea></div>
                        <div class="form-group"><label>Link către Proiect</label><input type="url" class="project-link" value="${project.link || ''}"></div>
                        <button type="button" class="remove-project-btn" style="background-color: #dc3545;">Șterge Proiect</button>
                    `;
                    projectsContainer.appendChild(projectEntry);
                });
            }
        }
    };
    portfolioForm.addEventListener('input', saveDataToLocalStorage);
    loadDataFromLocalStorage();

    addProjectBtn.addEventListener('click', () => {
        const projectEntry = document.createElement('div');
        projectEntry.classList.add('project-form-entry');
        projectEntry.innerHTML = `
            <hr style="margin: 2rem 0;">
            <div class="form-group"><label>Titlu Proiect</label><input type="text" class="project-title" required></div>
            <div class="form-group"><label>Descriere Proiect</label><textarea class="project-desc" required></textarea></div>
            <div class="form-group"><label>Link către Proiect</label><input type="url" class="project-link" required></div>
            <button type="button" class="remove-project-btn" style="background-color: #dc3545;">Șterge Proiect</button>
        `;
        projectsContainer.appendChild(projectEntry);
        saveDataToLocalStorage();
    });

    projectsContainer.addEventListener('click', (event) => {
        if (event.target.classList.contains('remove-project-btn')) {
            event.target.closest('.project-form-entry').remove();
            saveDataToLocalStorage();
        }
    });

    portfolioForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const savedDataJSON = localStorage.getItem('portfolioFormData');
        if (!savedDataJSON) {
            alert("Formularul este gol. Te rugăm să completezi ceva.");
            return;
        }
        const portfolioData = JSON.parse(savedDataJSON);
        try {
            const response = await fetch('http://localhost:3000/api/portfolio', {
                method: 'POST', 
                headers: {
                    'Content-Type': 'application/json' 
                },
                body: JSON.stringify(portfolioData) 
            });
            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Eroare de la server: ${response.status} ${response.statusText}. Detalii: ${errorText}`);
            }
            const result = await response.json();
            
            console.log('Serverul a răspuns:', result);
            alert('Portofoliul a fost trimis cu succes către server! Verifică terminalul unde rulează "node server.js".');

        } catch (error) {
            console.error('A apărut o eroare la trimiterea datelor:', error);
            alert('Nu am putut trimite datele către server. Asigură-te că serverul Node.js rulează și verifică consola pentru detalii.');
        }
    });
});