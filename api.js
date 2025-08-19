async function getData(url) {
    try {
        let response = await fetch(url, {
            method: 'get',
            headers: new Headers({
                'Authorization': 'Bearer <API_KEY>'
                })
        })
        return await response.json();
    } catch (error) {
        console.log(error);
    }
}

async function setPage() {
    let page = await getData('https://api.airtable.com/v0/appp5bVt5FJXfh4Tk/page')

    let logos = document.querySelectorAll('.logo');
    logos.forEach(logo => {
        logo.innerHTML = `<img src="${page.records[0].fields.logo[0].url}" alt="">`;
    });
    
    document.querySelector('section#home').style.backgroundImage = `url(${page.records[0].fields.home[0].url})`
    document.querySelector('section#about').style.backgroundImage = `url(${page.records[0].fields.about[0].url})`
    document.querySelector('section#offer').style.backgroundImage = `url(${page.records[0].fields.offer[0].url})`
    document.querySelector('section#courses').style.backgroundImage = `url(${page.records[0].fields.courses[0].url})`
    document.querySelector('section#contact').style.backgroundImage = `url(${page.records[0].fields.contact[0].url})`
}    

async function setHome() {
    let home = await getData('https://api.airtable.com/v0/appp5bVt5FJXfh4Tk/home')

    let sentences = []
    home.records.forEach(sentence => {
        sentences.push(sentence.fields.sentence)
    });

    var typed = new Typed(".auto-type", {
        strings: sentences,
        typeSpeed: 100,
        backSpeed: 50,
        loop: true
      });
}  

async function setAbout() {
    let about = await getData('https://api.airtable.com/v0/appp5bVt5FJXfh4Tk/about')

    let image = document.querySelector('.image');
    image.innerHTML = `<img src="${about.records[0].fields.photo[0].url}" alt="">`;

    let description = document.querySelector('section#about .description');
    description.innerHTML = about.records[0].fields.description

}    

async function setOffer() {
    let offer = await getData('https://api.airtable.com/v0/appp5bVt5FJXfh4Tk/offer')

    let description = document.querySelector('section#offer .description');
    description.innerHTML = offer.records[0].fields.description

}

async function setCourse() {
    let courses = await getData('https://api.airtable.com/v0/appp5bVt5FJXfh4Tk/courses')

    let htmlCourses = '';
    courses.records.forEach(course => {
        
        let htmlCourse = `<div class="inner-card">
                            <a href="${course.fields.link}" target="_blank">
                                <p id="title">${course.fields.name}</p>
                                <video src="${course.fields.video[0].url}" poster="${course.fields.photo[0].url}" controls></video>
                                <p class="description">${course.fields.description}</p>
                                <div class="details">
                                    <p class="duration"><span class="fa fa-clock-o"></i></span>${course.fields.duration}</p>
                                    <p class="materials"><span class="fa fa-book"></i></span>${course.fields.materials}</p>                                    
                                    <p class="rate"><span class="fa fa-star checked"></i></span>${course.fields.rating}</p>
                                    <p class="users"><span class="fa fa-user"></span>${course.fields.users}</p>
                                </div>
                                <p class="price"><span class="fa fa-tag"></span>${course.fields.price_calc}</p>
                            </a>
                        </div>`;

        htmlCourses += htmlCourse;
    });

    let container = document.querySelector('section#courses .card');
    container.innerHTML = htmlCourses;
} 

async function setContact() {
    let contacts = await getData('https://api.airtable.com/v0/appp5bVt5FJXfh4Tk/contact?sort%5B0%5D%5Bfield%5D=order&sort%5B0%5D%5Bdirection%5D=asc')

    let htmlContacts = '';
    contacts.records.forEach(contact => {
        
        let htmlContact = `<div class="${contact.fields.type}">
                                <a href="${contact.fields.link}">
                                    <img src="${contact.fields.logo[0].url}" alt="">	
                                    <p>${contact.fields.name}</p>
                                </a>
                            </div>`;

        htmlContacts += htmlContact;
    });

    let container = document.querySelector('section#contact .contact-list');
    container.innerHTML = htmlContacts;
} 

(function setSite() {
    setPage();
    setHome();
    setAbout();
    setOffer();
    setCourse();
    setContact();
    setPage();
})();


