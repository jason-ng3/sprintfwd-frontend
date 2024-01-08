<h1>Members</h1>
<button onclick="openCreateForm()">Add New Member</button>
<form id="addMemberForm" style="display: none;">
    @csrf

    <div>
        <label for="first_name">First Name:</label>
        <input type="text" name="first_name" id="first_name" required>
    </div>

    <div>
        <label for="last_name">Last Name:</label>
        <input type="text" name="last_name" id="last_name" required>
    </div>

    <div>
        <label for="city">City:</label>
        <input type="text" name="city" id="city">
    </div>

    <div>
        <label for="state">State:</label>
        <input type="text" name="state" id="state">
    </div>

    <div>
        <label for="country">Country:</label>
        <input type="text" name="country" id="country">
    </div>

    <div>
        <label for="view_team_name">Team:</label>
        <select name="team_id" id="view_team_name" required>
        </select>
    </div>

    <button type="button" onclick="closeCreateForm()">Close</button>
    <button type="submit">Submit</button>
</form>

<ul>
    @if(!empty($members))
        @foreach ($members as $member)
            <li id="member_{{$member['id']}}">
                {{ $member['first_name'] }} {{ $member['last_name'] }}
                <button type="button" onclick="showMemberDetails({{ json_encode($member) }})">View</button>
                <button onclick="editMember({{ $member['id'] }}, {{ $member['team']['id'] }})">Edit</button>
                <button onclick="deleteMember({{ $member['id'] }})">Delete</button>

                <div id="editMember_{{ $member['id'] }}" style="display: none;">
                    <div>
                        <label for="editFirstName_{{ $member['id'] }}">First Name:</label>
                        <input type="text" id="editFirstName_{{ $member['id'] }}" value="{{ $member['first_name'] }}">
                    </div>

                    <div>
                        <label for="editLastName_{{ $member['id'] }}">Last Name:</label>
                        <input type="text" id="editLastName_{{ $member['id'] }}" value="{{ $member['last_name'] }}">
                    </div>
                    
                    <div>
                        <label for="editCity_{{ $member['id'] }}">City:</label>
                        <input type="text" id="editCity_{{ $member['id'] }}" value="{{ $member['city'] }}">
                    </div>

                    <div>
                        <label for="editState_{{ $member['id'] }}">State:</label>
                        <input type="text" id="editState_{{ $member['id'] }}" value="{{ $member['state'] }}">
                    </div>

                    <div>
                        <label for="editCountry_{{ $member['id'] }}">Country:</label>
                        <input type="text" id="editCountry_{{ $member['id'] }}" value="{{ $member['country'] }}">
                    </div>

                    <div>
                        <label for="edit_team_name_{{ $member['id'] }}">Team:</label>
                        <select name="team_id" id="edit_team_name_{{ $member['id'] }}" required>
                        </select>
                    </div>

                    <button onclick="saveMember({{ $member['id'] }}, {{ $member['team_id'] }})">Save</button>
                    <button type="button" onclick="closeEdit({{ $member['id'] }})">Close</button>
                </div>
            </li>
        @endforeach
    @else
        <p id="noMembersMessage">No members found.</p>
    @endif
</ul>

<div id="memberModal" style="display:none;">
    <p>First Name: <span id="modalFirstName"></span></p>
    <p>Last Name: <span id="modalLastName"></span></p>
    <p>City: <span id="modalCity"></span></p>
    <p>State: <span id="modalState"></span></p>
    <p>Country: <span id="modalCountry"></span></p>
    <p>Team: <span id="modalTeam"></span></p>
    <button onclick="closeMemberModal()">Close</button>
</div>

<script src="{{ asset('js/members.js') }}"></script>