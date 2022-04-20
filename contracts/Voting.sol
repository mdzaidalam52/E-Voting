// SPDX-License-Identifier: MIT

pragma solidity ^0.8.13;

contract Voting {
    struct candidateInfo {
        uint256 candidate;
        uint256 no_of_votes;
        string name;
    }
    uint256 no_of_candidates;
    candidateInfo[] candidateVotingList;
    uint256[] candidateList;
    mapping(uint256 => uint256) voters;
    address owner;
    event Success(bool success, string msg);
    event CandidateList(candidateInfo[] list);

    constructor() {
        owner = msg.sender;
    }

    function registerCandidate(uint256 _aadhar, string memory _name) public {
        for (uint256 i = 0; i < no_of_candidates; i++) {
            if(candidateVotingList[i].candidate == _aadhar){
                emit Success(false, "This candidate has already been registered");
                return;
            }
        }
        no_of_candidates++;
        candidateVotingList.push(candidateInfo(_aadhar, 0, _name));
        emit Success(true, "Candidate has been registered successfully");
    }

    function vote(uint256 _voter, uint256 _candidate) public {
        bool found = false;
        uint256 ind = 0;
        for (uint256 i = 0; i < candidateVotingList.length; i++) {
            if (candidateVotingList[i].candidate == _candidate) {
                ind = i;
                found = true;
                break;
            }
        }
        if(!found || voters[_voter] != 0){
            emit Success(false, "The candidate is not found or the voter has already voted");
            return;
        }
        voters[_voter] = _candidate;
        candidateVotingList[ind].no_of_votes++;
        emit Success(true, "Voted Successfully");
    }

    function getNoOfVotes() public {
        emit CandidateList(candidateVotingList);
    }
}
