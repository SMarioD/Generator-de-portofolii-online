document.addEventListener('DOMContentLoaded', () => {
    const portfolioForm = document.querySelector('.generator-form');
    const previewContainer = document.getElementById('portfolio-preview');
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

    portfolioForm.addEventListener('submit', (event) => {
        event.preventDefault(); 
        const finalDataJSON = localStorage.getItem('portfolioFormData');
        if (!finalDataJSON) return; 

        const portfolioData = JSON.parse(finalDataJSON);
        portfolioData.skillList = (portfolioData.skills || '').split(',').map(s => s.trim()).filter(s => s);
        portfolioData.projectList = portfolioData.projects; 
        const generatedHTML = `
            <h2 style="text-align: center; margin-top: 3rem; margin-bottom: 1rem;">Preview Portofoliu</h2>
            <header class="portfolio-header"><h1>${portfolioData.name || 'Numele Tău'}</h1><p>${portfolioData.title || 'Titlul Tău Profesional'}</p></header>
            <section class="portfolio-section"><h2>Despre Mine</h2><p>${portfolioData.description || 'Descrierea ta va apărea aici.'}</p></section>
            <section class="portfolio-section"><h2>Abilități Tehnice</h2><ul class="skills-list">${portfolioData.skillList.length > 0 ? portfolioData.skillList.map(skill => `<li>${skill}</li>`).join('') : '<li>Adaugă abilitățile tale.</li>'}</ul></section>
            <section class="portfolio-section"><h2>Proiecte</h2><div class="projects-grid">${portfolioData.projectList.length > 0 ? portfolioData.projectList.map(proj => `<div class="project-card"><img src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80" alt="Imagine proiect"><div class="project-card-body"><h3>${proj.title || 'Titlu Proiect'}</h3><p>${proj.description || 'Descrierea proiectului.'}</p><a href="${proj.link}" class="project-link" target="_blank" rel="noopener noreferrer">Vezi Proiectul</a></div></div>`).join('') : '<p>Adaugă proiectele tale.</p>'}</div></section>
        `;

        previewContainer.innerHTML = generatedHTML;
    });
});