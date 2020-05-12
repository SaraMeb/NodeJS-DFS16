document.getElementById('btnLogin').addEventListener('submit', fuction(evt) {
  evt.preventDefault();
  console.log(evt.target);
  var email = evt.target.querySelector('input[name=email]').value;
  var password = evt.target.querySelector('input[name=password]').value;
  var data = {
    'email' : email,
    'password' : password,
  };
  fetch('/users', {
    method: 'put',
    headers: {
      'Content-Type': 'application/json'
    },
    body : JSON.stringify(data)
  })
  .then(function(r) {
    console.log(r);
    return r.json()
  })
  .then(function(response) {
    console.log(response);
    if (response.status) {
      document.location.reload();
    } else {
      console.log(response);
      
      alert('erreur');
    }
    console.log(response);
  })
})
