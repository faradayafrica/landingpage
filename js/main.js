const FormButton = document.querySelector('#newsletterForm button')


const validate = async (buttonEl, inputField, errorField) => {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;    
  if (inputField.value.length == 0) {
    inputField.classList.add('error_active')
    errorField.innerHTML = "Email Field can't be empty"
    errorField.style.display = 'block'
    setTimeout(() => {
      inputField.classList.remove('error_active')
      errorField.innerHTML = ""
      errorField.style.display = 'none'
    }, 3000)
  } else if (re.test(String(inputField.value).toLowerCase()) !== true) {
    inputField.classList.add('error_active')
    errorField.innerHTML = "Invalid email address"
    errorField.style.display = 'block'
    setTimeout(() => {
      inputField.classList.remove('error_active')
      errorField.innerHTML = ""
      errorField.style.display = 'none'
    }, 3000)
  } else {
    try {
      
      buttonEl.innerHTML = ''
      buttonEl.style.display = 'flex';
      buttonEl.style.justifyContent = 'center';
      buttonEl.style.alignItems = 'center';
      const newSpan = document.createElement('div')
      buttonEl.disabled = true
      newSpan.classList.add('loader')
      buttonEl.appendChild(newSpan)
      const response = await fetch('https://newsletterfaraday.herokuapp.com/api/users/add',  {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json'        
        },
        body: JSON.stringify({ name: inputField.value, email: inputField.value})
      })
      if (response.status !== 201) {
        buttonEl.innerHTML = 'Subscribe'
        buttonEl.disabled = false
        inputField.classList.add('error_active')
        errorField.innerHTML = "You are already subscribed"
        errorField.style.display = 'block'
        setTimeout(() => {
          inputField.classList.remove('error_active')
          errorField.innerHTML = ""
          errorField.style.display = 'none'
        }, 3000)
      } else {
        inputField.value = ''
        overlayContainer.style.display = 'flex'  
        buttonEl.innerHTML = 'Subscribe'    
      }
    } catch (e) {      
        buttonEl.innerHTML = 'Subscribe'
        buttonEl.disabled = false
        alert('Something went wrong, Try Again')        
    }
    
  }         
}