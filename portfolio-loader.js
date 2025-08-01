document.addEventListener('DOMContentLoaded', () => {
    const mainContainer = document.querySelector('main.container');
    const savedDataJSON = localStorage.getItem('portfolioFormData');
    if (!savedDataJSON) {
        mainContainer.innerHTML = `
            <div class="portfolio-section" style="text-align: center;">
                <h2>Oops! Nu am găsit date.</h2>
                <p>Te rugăm să te întorci la generator pentru a-ți crea portofoliul.</p>
                <a href="generator.html" class="project-link" style="margin-top: 1rem;">Înapoi la Generator</a>
            </div>
        `;
        return;
    }
    const portfolioData = JSON.parse(savedDataJSON);
    const skillList = (portfolioData.skills || '').split(',').map(s => s.trim()).filter(s => s);
    const projectList = portfolioData.projects || [];
    const generatedHTML = `
        <header class="portfolio-header">
            <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80" alt="Fotografie de profil" class="profile-pic">
            <h1>${portfolioData.fullName || 'Numele Tău'}</h1>
            <p>${portfolioData.jobTitle || 'Titlul Tău Profesional'}</p>
        </header>
        <main>
            <section class="portfolio-section">
                <h2>Despre Mine</h2>
                <p>${portfolioData.bio || 'Descrierea ta va apărea aici.'}</p>
            </section>
            <section class="portfolio-section">
                <h2>Abilități Tehnice</h2>
                <ul class="skills-list">${skillList.length > 0 ? skillList.map(skill => `<li>${skill}</li>`).join('') : '<li>Nu au fost adăugate abilități.</li>'}</ul>
            </section>
            <section class="portfolio-section">
                <h2>Proiecte</h2>
                <div class="projects-grid">${projectList.length > 0 ? projectList.map(proj => `<div class="project-card"><img src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80" alt="Imagine proiect"><div class="project-card-body"><h3>${proj.title || 'Titlu Proiect'}</h3><p>${proj.description || 'Descrierea proiectului.'}</p><a href="${proj.link}" class="project-link" target="_blank" rel="noopener noreferrer">Vezi Proiectul</a></div></div>`).join('') : '<p>Nu au fost adăugate proiecte.</p>'}</div>
            </section>
        </main>
        <footer class="portfolio-footer">
            <h2>Contact</h2>
            <p>Generat cu succes!</p>
        </footer>
    `;
    mainContainer.innerHTML = generatedHTML;
});