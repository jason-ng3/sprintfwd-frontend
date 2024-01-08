import { appendNewMember, appendNewTeam } from './form_helpers.js';

export var newMembers = [];

/* 
Handles addMember form submission: creates member in database, resets and closes
the form & appends new member item to UI
*/
document.getElementById('addMemberForm').addEventListener('submit', function(e) {
  e.preventDefault();

  const formData = new FormData(document.getElementById('addMemberForm'));

  const jsonObject = {};
  formData.forEach((value, key) => {
      jsonObject[key] = value;
  });

  fetch('http://localhost:8000/api/members', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content
      },
      body: JSON.stringify(jsonObject)
  })
  .then(response => {
      return response.json().then(json => {
          return response.ok ? json : Promise.reject(json);
      });
  })
  .then(json => {
      console.log(json.data);
      document.getElementById('addMemberForm').reset();
      document.getElementById('addMemberForm').style.display = 'none';
      appendNewMember(json.data)
  })
  .catch(error => {
      console.error('Add member failed:', error);
  });
});

/*
Handles addTeam form submission: creates team in database, resets and closes
the form & appends new team item to UI
*/
document.getElementById('addTeamForm').addEventListener('submit', function(e) {
  e.preventDefault();

  const formData = new FormData(document.getElementById('addTeamForm'));

  const jsonObject = {};
  formData.forEach((value, key) => {
      jsonObject[key] = value;
  });
  console.log(jsonObject);
  fetch('http://localhost:8000/api/teams', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content
      },
      body: JSON.stringify(jsonObject)
  })
  .then(response => {
      return response.json().then(json => {
          return response.ok ? json : Promise.reject(json);
      });
  })
  .then(json => {
      console.log(json.data);
      document.getElementById('addTeamForm').reset();
      document.getElementById('addTeamForm').style.display = 'none';
      appendNewTeam(json.data)
  })
  .catch(error => {
      console.error('Add team failed:', error);
  });
});
