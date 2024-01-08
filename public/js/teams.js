// VIEW TEAM
// When View button is clicked, populate and display modal 
function showTeamDetails(team) {
  document.getElementById('modalName').textContent = team.name;

  const membersList = document.getElementById('modalMembers');
  membersList.innerHTML = '';

  team.members.forEach(member => {
    const listItem = document.createElement('li');
    listItem.textContent = member.first_name + ' ' + member.last_name;
    membersList.appendChild(listItem);
  });

  console.log(newMembers);
  if (newMembers) {
    newMembers.forEach(newMember => {
      const listItem = document.createElement('li');
      listItem.textContent = newMember.first_name + ' ' + newMember.last_name;
      membersList.appendChild(listItem);
    });

    newMembers = [];
  } 

  document.getElementById('teamModal').style.display = 'block';
}

// Close the modal
function closeTeamModal() {
  document.getElementById('teamModal').style.display = 'none';
}


// ADD NEW TEAM
/*
When Add New Team button is clicked, display the form
*/
function openCreateTeamForm() {
  document.getElementById(`addTeamForm`).style.display = 'block';
}

// When Close button is clicked, close the form
function closeCreateTeamForm() {
  document.getElementById(`addTeamForm`).style.display = 'none';
}

// UPDATE TEAM
// Display edit form
function editTeam(teamId) {
  document.getElementById(`editTeam_${teamId}`).style.display = 'block';
}

// Save updated team details to backend, close the update form & update view modal
function saveTeam(teamId) {
  var editedName = document.getElementById(`editName_${teamId}`).value;
  
  fetch(`http://localhost:8000/api/teams/${teamId}`, {
      method: 'PUT',
      headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content
      },
      body: JSON.stringify({
          name: editedName
      })
  })
  .then(response => {
      return response.json().then(json => {
          return response.ok ? json : Promise.reject(json);
      });
  })
  .then(data => {
      console.log('Update successful:', data);

      // Close the edit form
      document.getElementById(`editTeam_${teamId}`).style.display = 'none';
      
      const updatedTeam = {
          id: teamId,
          name: editedName,
      };

      // Update view button to show updated team details
      const viewButton = document.querySelector(`#team_${teamId} button[onclick*='showTeamDetails']`);
      if (viewButton) {
          viewButton.setAttribute('onclick', `showTeamDetails(${JSON.stringify(updatedTeam)})`);
      }

      const teamElement = document.getElementById(`team_${teamId}`);
      if (teamElement) {
          const teamNameElement = teamElement.querySelector('.team-name');
          if (teamNameElement) {
              teamNameElement.textContent = editedName;
          }
      }


  })
  .catch(error => {
      console.error('Update failed:', error);
  });
}

// Close the edit form
function closeTeamEdit(teamId) {
  document.getElementById(`editTeam_${teamId}`).style.display = 'none';
}


// DELETE Team
// Delete team from backend and remove team item from UI
function deleteTeam(teamId) {
  if (!confirm('Are you sure you want to delete this team?')) {
      return;
  }

  fetch(`http://localhost:8000/api/teams/${teamId}`, {
      method: 'DELETE',
      headers: {
          'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content
      }
  })
  .then(response => {
      return response.json().then(json => {
          return response.ok ? json : Promise.reject(json);
      });
  })
  .then(() => {
      const teamItem = document.getElementById(`team_${teamId}`);
  
      if (teamItem) {
          teamItem.remove();
      }

      const remainingTeams = document.querySelectorAll('ul#team li');
      if (remainingTeams.length === 0) {
          const noTeamsMessage = document.getElementById('noTeamsMessage');
          if (noTeamsMessage) {
              noTeamsMessage.style.display = 'block';
          }
      }

      console.log('Team deleted.');
  })
  .catch(error => {
      console.error('Delete failed:', error);
  });
}