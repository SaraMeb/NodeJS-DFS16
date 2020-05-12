document.getElementById('userName').addEventListener('click', function(evt) {

})

document.getElementById('logout').addEventListener('click', function(evt) {
  fetch('/users', {
    method: 'delete',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    credentials: 'include'
  }).then(function(r) {
    return r.json()
  }).then(fuunction(response) {
    if(response.status) {
      document.location.href = '/admin';
    } else {
      alert(response.message || 'Une erreur est survenue');
    }
  })
})
