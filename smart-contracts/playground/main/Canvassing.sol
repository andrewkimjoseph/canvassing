// SPDX-License-Identifier: MIT

pragma solidity 0.8.19;

import {Researcher, Participant, Survey, Question, Answer, Earning, Funding} from "../utils/Structs.sol";

contract Canvassing {
    // Metamask - The Old Lad
    address canvassingOwnerWalletAddress =
        0xecE897a85688f2e83a73Fed36b9d1a6efCC99e93;

    // address - {researcherWalletAddress}
    mapping(address => Researcher) private allResearchers;

    // address - {participantWalletAddress}
    mapping(address => Participant) private allParticipants;
    Survey[] private allSurveys;

    // uint256 - {surveyId}
    mapping(uint256 => Question[]) private allQuestions;

    // uint256 - {surveyId}
    mapping(uint256 => Answer[]) private allAnswers;

    Funding[] private allFundings;

    Earning[] private allEarnings;

    // GLOBAL
    uint256 currentResearcherId;
    uint256 currentParticipantId;
    uint256 currentSurveyId;
    uint256 currentQuestionId;
    uint256 currentAnswerId;
    uint256 currentEarningId;

    function checkIfParticipantExists(address _walletAddress)
        public
        view
        returns (bool)
    {
        return allParticipants[_walletAddress].isBlank ? false : true;
    }

    function getParticipantByWalletAddress(address _walletAddress)
        public
        view
        returns (Participant memory)
    {
        return allParticipants[_walletAddress];
    }

    function createParticipant(
        address _walletAddress,
        string memory _gender,
        string memory _country,
        uint256 _yearOfBirth
    ) public {
        uint256 newParticipantId = currentParticipantId;

        Participant memory newParticipant;

        newParticipant.id = newParticipantId;
        newParticipant.walletAddress = _walletAddress;
        newParticipant.gender = _gender;
        newParticipant.country = _country;
        newParticipant.yearOfBirth = _yearOfBirth;
        newParticipant.totalNumberOfSurveysTaken = 0;

        newParticipant.isResearcher = false;
        newParticipant.isBlank = false;

        allParticipants[_walletAddress] = newParticipant;

        newParticipantId++;
    }

    function getAllSurveys() public view returns (Survey[] memory) {
        return allSurveys;
    }

    function getSurveyById(uint256 _surveyId)
        public
        view
        returns (Survey memory)
    {
        return allSurveys[_surveyId];
    }

    function getAllEarningsMadeByParticipant(address _walletAddress)
        public
        view
        returns (Earning[] memory)
    {
        uint256 totalNumberOfSurveysTakenByParticipant = allParticipants[
            _walletAddress
        ].totalNumberOfSurveysTaken;

        Earning[] memory allEarningsMadeByParticipant = new Earning[](
            totalNumberOfSurveysTakenByParticipant
        );
        uint256 earningIndex = 0;

        for (
            uint256 earningId = 0;
            earningId < allEarnings.length;
            earningId++
        ) {
            Earning memory runningEarning = allEarnings[earningId];

            if (runningEarning.participantWalletAddress == _walletAddress) {
                allEarningsMadeByParticipant[earningIndex] = runningEarning;
                earningIndex++;
            }
        }

        return allEarningsMadeByParticipant;
    }

    function getAllSurveysTakenByParticipant(address _walletAddress)
        public
        view
        returns (Survey[] memory)
    {
        // 1. Get the particular {Earning[]} made by the {Participant} for taking the {Survey}
        Earning[]
            memory allEarningsMadeByParticipant = getAllEarningsMadeByParticipant(
                _walletAddress
            );

        Survey[] memory allSurveysTakenByParticipant = new Survey[](
            allEarningsMadeByParticipant.length
        );
        uint256 surveyIndex = 0;

        // 2. Get the {surveyId} in the {Earning} and use them to get the particular {Survey}

        for (
            uint256 earningId = 0;
            earningId < allEarningsMadeByParticipant.length;
            earningId++
        ) {
            Earning memory runningEarning = allEarningsMadeByParticipant[
                earningId
            ];

            allSurveysTakenByParticipant[surveyIndex] = allSurveys[
                runningEarning.surveyId
            ];
            surveyIndex++;
        }

        return allSurveysTakenByParticipant;
    }
}
