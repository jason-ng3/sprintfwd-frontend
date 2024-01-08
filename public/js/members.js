// VIEW MEMBER
// When View button is clicked, populate and display modal 
function showMemberDetails(member) {
    console.log(member);
    document.getElementById('modalFirstName').textContent = member.first_name;
    document.getElementById('modalLastName').textContent = member.last_name;
    document.getElementById('modalCity').textContent = member.city;
    document.getElementById('modalState').textContent = member.state;
    document.getElementById('modalCountry').textContent = member.country;
    document.getElementById('modalTeam').textContent = member.team.name;

    document.getElementById('memberModal').style.display = 'block';
}

// Close the modal
function closeMemberModal() {
    document.getElementById('memberModal').style.display = 'none';
}


// ADD NEW MEMBER
/*
When Add New Member button is clicked, fetch teams from the backend to populate
dropdown for choosing a team and display the form
*/
function openCreateForm() {
    fetchTeams();
    document.getElementById(`addMemberForm`).style.display = 'block';
}

// When Close button is clicked, close the form
function closeCreateForm() {
    document.getElementById(`addMemberForm`).style.display = 'none';
}

function fetchTeams() {
    fetch('http://localhost:8000/api/teams')
        .then(response => response.json())
        .then(data => populateTeamDropdown(data.teams))
        .catch(error => console.error('Error fetching teams:', error)
    );
}

function populateTeamDropdown(teams) {
    const viewSelect = document.getElementById('view_team_name');
    viewSelect.innerHTML = '';

    teams.forEach(team => {
        const viewOption = document.createElement('option');
        viewOption.value = team.id;
        viewOption.textContent = team.name;
        viewSelect.appendChild(viewOption);
    });
}

function fetchEditTeams(memberId, currentTeamId) {
    fetch('http://localhost:8000/api/teams')
        .then(response => response.json())
        .then(data => populateEditTeamDropdown(data.teams, memberId, currentTeamId))
        .catch(error => console.error('Error fetching teams:', error)
    );
}

function populateEditTeamDropdown(teams, memberId, currentTeamId) {
    const editSelect = document.getElementById('edit_team_name_' + memberId);
    console.log(memberId)
    editSelect.innerHTML = '';

    if (teams.length === 0) {
        const defaultOption = document.createElement('option');
        defaultOption.value = '';
        defaultOption.textContent = 'No teams available';

        editSelect.appendChild(defaultOption);
    } else {
        teams.forEach(team => {
            const editOption = document.createElement('option');
            editOption.value = team.id;
            editOption.textContent = team.name;

            if (team.id === currentTeamId) {
                editOption.selected = true;
            }

            editSelect.appendChild(editOption);
        });
    }
}


// UPDATE MEMEBER 
// Display edit form
function editMember(memberId, currentTeamId) {
    fetchEditTeams(memberId, currentTeamId);
    document.getElementById(`editMember_${memberId}`).style.display = 'block';
}

// Save updated member details to backend, close the update form & update view modal
function saveMember(memberId) {
    var editedFirstName = document.getElementById(`editFirstName_${memberId}`).value;
    var editedLastName = document.getElementById(`editLastName_${memberId}`).value;
    var editedCity = document.getElementById(`editCity_${memberId}`).value;
    var editedState = document.getElementById(`editState_${memberId}`).value;
    var editedCountry = document.getElementById(`editCountry_${memberId}`).value;

    var dropdown = document.getElementById(`edit_team_name_${memberId}`);
    var editedTeamId = dropdown.value;
    var editedTeamName = dropdown.options[dropdown.selectedIndex].textContent;
    
    fetch(`http://localhost:8000/api/members/${memberId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content
        },
        body: JSON.stringify({
            first_name: editedFirstName,
            last_name: editedLastName,
            city: editedCity,
            state: editedState,
            country: editedCountry,
            team_id: editedTeamId,
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
        document.getElementById(`editMember_${memberId}`).style.display = 'none';
        console.log(`editedTeam: ${editedTeamId}: ${editedTeamName}`);
        const updatedMember = {
            id: memberId,
            first_name: editedFirstName,
            last_name: editedLastName,
            city: editedCity,
            state: editedState,
            country: editedCountry,
            team: {
                id: editedTeamId,
                name: editedTeamName,
            }
        };

        // Update view button to show updated member details
        const viewButton = document.querySelector(`#member_${memberId} button[onclick*='showMemberDetails']`);
        if (viewButton) {
            viewButton.setAttribute('onclick', `showMemberDetails(${JSON.stringify(updatedMember)})`);
        }

        const editButton = document.querySelector(`#member_${memberId} button[onclick*='editMember']`);
        if (editButton) {
            editButton.setAttribute('onclick', `editMember(${memberId}, ${editedTeamId})`);
        }
    })
    .catch(error => {
        console.error('Update failed:', error);
    });
}

// Close the edit form
function closeEdit(memberId) {
    document.getElementById(`editMember_${memberId}`).style.display = 'none';
}


// DELETE MEMBER
// Delete member from backend and remove member item from UI
function deleteMember(memberId) {
    if (!confirm('Are you sure you want to delete this member?')) {
        return;
    }

    fetch(`http://localhost:8000/api/members/${memberId}`, {
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
        const memberItem = document.getElementById(`member_${memberId}`);
        console.log(memberItem);
        if (memberItem) {
            memberItem.remove();
        }

        const remainingMembers = document.querySelectorAll('ul li');
        if (remainingMembers.length === 0) {
            const noMembersMessage = document.getElementById('noMembersMessage');
            if (noMembersMessage) {
                noMembersMessage.style.display = 'block';
            }
        }

        console.log('Member deleted.');
    })
    .catch(error => {
        console.error('Delete failed:', error);
    });
}