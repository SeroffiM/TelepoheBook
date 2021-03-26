class Contacts{
    constructor(firsName,lastName,number,adress){
        this.firsName = firsName
        this.lastName = lastName
        this.number = number
        this.adress =adress
    }
}

let contactsObject = new Map()

let addButton = document.querySelector('#left-side__add-button')
addButton.addEventListener('click',()=>{hiddenPromt(true)})
addButton.addEventListener('click',()=>{createNewContactForm('Новый контакт')})


function disableFlex(value){
    let elem = document.querySelector('.right-side__wrapper')
    elem.style.display = value
}
function hiddenPromt(bool){
    hiddenText(bool,'#right-side__wrapper-text')
}

function hiddenText(bool,id){
    let elem = document.querySelector(id)
    elem.hidden = bool
}

function createNewContactForm(typeContact,contact=undefined,elemCreated){
    let elem = document.querySelector('#right-side__wrapper')
    
    let elem2 = createDiv('right-side__wrapper-form','right-side__wrapper-form')
    if(elem.lastChild.id!='right-side__wrapper-text'){
        elem.lastChild.remove()
    }
    elem.append(elem2)

    let elem3 = createDiv('right-side__header-wrapper','right-side__header-wrapper')
    let elem4 = createDiv('right-side__main-wrapper','right-side__main-wrapper')
    elem2.append(elem3)
    elem2.append(elem4)
    elem3.append(createHeading(typeContact))
    elem4.append(createForm('right-side__form',contact))
    
    let elem5 = createDiv('right-side__wrapper-footer')
    let elem6 = createDiv('right-side__wrapper-footer-button')
    elem4.append(elem5)
    elem5.append(elem6)

    elem6.append(createButton('left-side__contacts button right-side_button-save',()=>{SaveContact(contact,elemCreated)},'Сохранить'))
    elem6.append(createButton('left-side__contacts button right-side_button-save',cancelAdding,'Отмена'))
}

function createNewContact(contact,ChangeContact=false,elemCreated=null){
    let elem = document.querySelector('#left-side__wrapper-contacts')
    if(ChangeContact){
        console.log(elemCreated);
        elemCreated.addEventListener('click',function(){showInformation(contact,elemCreated)}) 

    }
    else {
        

        let elem2 = createButton('left-side__contacts button',function(){showInformation(contact,elem2)})  //созд.контакта
        elem2.addEventListener('click',()=>{disableFlex('block')})
        elem2.addEventListener('click',hiddenPromt)
        let str1 = `${contact.firsName[0]}`.toUpperCase()
        let str2 = `${contact.lastName[0]}`.toUpperCase()
        elem.append(elem2)
        let elem3 = createDiv('left-side__contacts-information')
        let elem4 = createDiv('left-side__contacts-image','left-side__contacts-image')
        let elem5 = createDiv('left-side__image-text','left-side__image-text')
        elem2.append(elem3)
        elem3.append(elem4)
        elem3.append(elem5)
        elem4.append(createElem('p',str1+str2))
        elem5.append(createElem('p',contact.firsName+' '+contact.lastName))
    }
}

function createElem(elemName,value=null,className=null){
    let elem = document.createElement(elemName)
    elem.className = className
    elem.textContent = value
    return elem
}
function createImg(className,src){
    let elem = document.createElement('img')
    elem.className = className
    elem.src = src
    return elem
}
function createDiv(className,id = null){
    let elemDiv = document.createElement('div')
    elemDiv.className = className
    elemDiv.id = id
    return elemDiv
}

function createHeading(value){
    let elemHeading = document.createElement('h3')
    elemHeading.textContent= value
    return elemHeading
}

function createForm(className,contact=4){
    let elem = document.createElement('form')
    let arr = ['Имя','Фамилия','Телефон','Адрес']
    let arrValues = [contact.firsName,contact.lastName,contact.number,contact.adress]
    // console.log(arrValues);
    elem.className = className
    for(let i = 0;i<4;i++){
        elem.append(createHeading(arr[i]))
        elem.append(createInput('left-side__search-contacts','text',arrValues[i]))

        elem.append(createDiv('right-side__main-line'))
    }
    return elem
}

function createInput(className,type,value=null){
    let elem = document.createElement('input')
    elem.required = true
    elem.type = type
    elem.value = value
    elem.className = className
    return elem
}

function createButton(className,fn,value = null,id = null){
    let elem = document.createElement('button')
    elem.className = className
    elem.textContent = value
    elem.id = id
    elem.addEventListener('click',fn)
    return elem
}

function SaveContact(createdContact,elemCreated){
    let elem = document.forms[0]
    let arrValue = []
    for(let i = 0;i<4;i++){
        arrValue.push(elem[i].value)
    }
    let contact = new Contacts(...arrValue)
    let elemForm = document.querySelector('#right-side__wrapper-form')
    if(createdContact===undefined){
        
        contactsObject.set(arrValue[0]+arrValue[1],contact)
        
        if(contact.firsName!="" && contact.lastName!="" && contact.number!="" && contact.adress!=""){
            elemForm.remove()
            createNewContact(contact)
            hiddenText(false,'#right-side__wrapper-text')
           
        }
    }
    else{
       
        let str1 = `${contact.firsName[0]}`.toUpperCase()
        let str2 = `${contact.lastName[0]}`.toUpperCase()
        let elem =  elemCreated.firstChild
        elem.firstChild.textContent = str1+str2
        // console.log(elem.firstChild);
        elem.lastChild.textContent = contact.firsName+' '+contact.lastName
        createNewContact(contact,true,elemCreated)
        hiddenText(false,'#right-side__wrapper-text')

        elemForm.remove()
    }
    disableFlex('flex')
    
}

function cancelAdding(){
    let elem = document.querySelector('#right-side__wrapper-form')
    elem.remove()
    hiddenText(false,'#right-side__wrapper-text')
    disableFlex('flex')
}
function showInformation(contact,elemCreated){
    let elem = document.querySelector('#right-side__wrapper')
    console.log(elemCreated);
    if(elem.lastChild.id!='right-side__wrapper-text'){
        elem.lastChild.remove()
    }

    elem.append(createContactInformation(contact,elemCreated))
    // console.log(contactsObject);

}


function createContactInformation(contact,elemCreated){
    let elem = createDiv('right-side__wrapper-informations-contact','right-side__wrapper-informations-contact')
    
    
    elem.append(createInformationHeader(contact,elemCreated))
    elem.append(createInformationMain(contact,elemCreated))

    return elem

}


function createInformationHeader(contact,elemCreated){
    let elemHeader = createDiv('right-side__information-contact__header')
    let elemHeader_button1 = createDiv('right-side__information-contact__header-wrapper-button')
    let elemHeader_name1 = createDiv('right-side__information-contact__header-wrapper-name')
    elemHeader.append(elemHeader_button1)
    elemHeader.append(elemHeader_name1)

    let elemHeader_button2 = createDiv('right-side__information-contact__header-wrapper-button-content')
    let elemHeader_name2 = createDiv('right-side__information-contact__header-name')
    elemHeader_button1.append(elemHeader_button2)
    elemHeader_name1.append(elemHeader_name2)

    let elemHeader_button3 = createButton('right-side__information-contact-button button',deleteContact,null,'right-side__delete-button')
    elemHeader_button3.append(createImg('right-side__image','image/Office_Icon_Set_Outline-10-512.png'))
    let elemHeader_button4 = createButton('right-side__information-contact-button button',deleteContact,null,'right-side__delete-button')
    let elemHeader_button5 = createButton('right-side__information-contact-button button',()=>{deleteContact(elemCreated)},null,'right-side__delete-button')
    elemHeader_button4.append(createImg('right-side__image','image/308-01-512.png'))
    elemHeader_button5.append(createImg('right-side__image','image/delete__trash__vector__design-512.png'))

    elemHeader_button2.append(elemHeader_button3)
    elemHeader_button2.append(elemHeader_button4)
    elemHeader_button2.append(elemHeader_button5)


    let elemHeader_name3 = createDiv('left-side__contacts-information')
    elemHeader_name2.append(elemHeader_name3)

    let elemHeader_name4 = createDiv('left-side__contacts-image right-side__contacts-image')
    let str1 = `${contact.firsName[0]}`.toUpperCase()
    let str2 = `${contact.lastName[0]}`.toUpperCase()
    elemHeader_name4.append(createElem('p',str1+str2))
    let elemHeader_name5 = createElem('div',contact.firsName+' '+contact.lastName,'right-side__contacts-name')
    elemHeader_name3.append(elemHeader_name4)
    elemHeader_name3.append(elemHeader_name5)

    return elemHeader
}

function createInformationMain(contact,elemCreated){
    let elemMain = createDiv('right-side__information-contact__main-wrapper')
    let elemMain2 = createDiv('right-side__information-contact__main')
    elemMain.append(elemMain2)

    let elemMain_Change = createDiv('right-side__information-contact__main-change-wapper')
    elemMain_Change.append(createElem('p','Контакт','right-side__information-contact__main-change-text'))
    elemMain_Change.append(createButton('right-side__information-contact__main-change-text right-side__main-change',()=>{changeContact(contact,elemCreated)},'  \u270E Изменить'))
    elemMain2.append(elemMain_Change)

    let elemMain3 = createDiv('right-side__information-contact__main-wrapper-content')
    elemMain2.append(elemMain3)
    let elemMain4 = createDiv('right-side__information-contact__main-content')
    let elemMain5 = elemMain4
    elemMain4.append(createElem('p','Мобильный телефон','right-side__information-contact__main-content-text'))
    elemMain4.append(createElem('p',contact.number,'right-side__information-contact__main-content-text right-side__information-contact__main-content-number'))
    elemMain5.append(createElem('p','Домашний адрес','right-side__information-contact__main-content-text'))
    elemMain5.append(createElem('p',contact.adress,'right-side__information-contact__main-content-text right-side__information-contact__main-content-number'))
    elemMain3.append(elemMain4)
    elemMain3.append(elemMain5)

    return elemMain



}

function changeContact(contact,elemCreated){
createNewContactForm('Изменить контакт',contact,elemCreated)

}

function deleteContact(elemCreated){
    let elem = document.querySelector('#right-side__wrapper')
    elemCreated.remove()
    elem.lastChild.remove()
    disableFlex('flex')
    hiddenText(false,'#right-side__wrapper-text')

}



