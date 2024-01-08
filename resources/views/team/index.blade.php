<h1>Teams</h1>
<button onclick="openCreateTeamForm()">Add New Team</button>
<form id="addTeamForm" style="display: none;">
    @csrf

    <div>
        <label for="name">Name:</label>
        <input type="text" name="name" id="name" required>
    </div>

    <button type="button" onclick="closeCreateTeamForm()">Close</button>
    <button type="submit">Submit</button>
</form>

<ul id="team">
    @if(!empty($teams))
        @foreach ($teams as $team)
            <li id="team_{{$team['id']}}">
                <span class="team-name">{{ $team['name'] }}</span>
                <button type="button" onclick="showTeamDetails({{ json_encode($team) }})">View</button>
                <button onclick="editTeam({{ $team['id'] }})">Edit</button>
                <button onclick="deleteTeam({{ $team['id'] }})">Delete</button>

                <div id="editTeam_{{ $team['id'] }}" style="display: none;">
                    <div>
                        <label for="editName_{{ $team['id'] }}">Name:</label>
                        <input type="text" id="editName_{{ $team['id'] }}" value="{{ $team['name'] }}">
                    </div>

                    <button onclick="saveTeam({{ $team['id'] }})">Save</button>
                    <button type="button" onclick="closeTeamEdit({{ $team['id'] }})">Close</button>
                </div>
            </li>
        @endforeach
    @else
        <p id="noTeamsMessage">No teams found.</p>
    @endif
</ul>

<div id="teamModal" style="display:none;">
    <h2 id="modalName"></h2>
    <ul id="modalMembers"></ul>
    <button onclick="closeTeamModal()">Close</button>
</div>

<script src="{{ asset('js/global.js') }}"></script>
<script src="{{ asset('js/teams.js') }}"></script>
