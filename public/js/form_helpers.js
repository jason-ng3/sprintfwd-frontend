export function appendNewMember(memberData) {
    const list = document.querySelector('ul');
    const listItem = document.createElement('li');
    listItem.id = `member_${memberData.id}`;

    const firstName = memberData.first_name ? memberData.first_name : '';
    const lastName = memberData.last_name ? memberData.last_name : '';
    const city = memberData.city ? memberData.city : '';
    const state = memberData.state ? memberData.state : '';
    const country = memberData.country ? memberData.country : '';
    const teamId = memberData.team.id;

    const noMembersMessage = document.getElementById('noMembersMessage');
    if (noMembersMessage) {
        noMembersMessage.style.display = 'none';
    }
    
    listItem.innerHTML = `
        ${memberData.first_name} ${memberData.last_name}
        <button type="button">View</button>
        <button onclick="editMember(${memberData.id}, ${teamId})">Edit</button>
        <button onclick="deleteMember(${memberData.id})">Delete</button>
        <div id="editMember_${memberData.id}" style="display: none;">
            <div>
                <label for="editFirstName_${memberData.id}">First Name:</label>
                <input type="text" id="editFirstName_${memberData.id}" value="${firstName}">
            </div>

            <div>
                <label for="editLastName_${memberData.id}">Last Name:</label>
                <input type="text" id="editLastName_${memberData.id}" value="${lastName}">
            </div>
            
            <div>
                <label for="editCity_${memberData.id}">City:</label>
                <input type="text" id="editCity_${memberData.id}" value="${city}">
            </div>

            <div>
                <label for="editState_${memberData.id}">State:</label>
                <input type="text" id="editState_${memberData.id}" value="${state}">
            </div>

            <div>
                <label for="editCountry_${memberData.id}">Country:</label>
                <input type="text" id="editCountry_${memberData.id}" value="${country}">
            </div>

            <div>
                <label for="edit_team_name_${memberData.id}"">Team:</label>
                <select name="team_id" id="edit_team_name_${memberData.id}"" required>
                </select>
            </div>

            <button onclick="saveMember(${memberData.id}, ${memberData.team_id})">Save</button>
            <button type="button" onclick="closeEdit(${memberData.id})">Close</button>
        </div>
    `;

    const viewButton = listItem.querySelector('button[type="button"]');
    viewButton.setAttribute('onclick', `showMemberDetails(${JSON.stringify(memberData)})`); 

    list.appendChild(listItem);

    newMembers.push(memberData);
}

export function appendNewTeam(teamData) {
    const list = document.querySelector('ul#team');
    const listItem = document.createElement('li');
    listItem.id = `team_${teamData.id}`;

    const name = teamData.name ? teamData.name : '';

    const noTeamsMessage = document.getElementById('noTeamsMessage');
    if (noTeamsMessage) {
        noTeamsMessage.style.display = 'none';
    }
    
    listItem.innerHTML = `
        ${teamData.name}
        <button type="button">View</button>
        <button onclick="editMember(${teamData.id})">Edit</button>
        <button onclick="deleteTeam(${teamData.id})">Delete</button>
        <div id="editMember_${teamData.id}" style="display: none;">
            <div>
                <label for="editName_${teamData.id}">First Name:</label>
                <input type="text" id="editName_${teamData.id}" value="${name}">
            </div>

            <button onclick="saveTeam(${teamData.id})">Save</button>
            <button type="button" onclick="closeEdit(${teamData.id})">Close</button>
        </div>
    `;

    const viewButton = listItem.querySelector('button[type="button"]');
    viewButton.setAttribute('onclick', `showMemberDetails(${JSON.stringify(teamData)})`); 

    list.appendChild(listItem);
}

