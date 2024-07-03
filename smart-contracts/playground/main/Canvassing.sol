// SPDX-License-Identifier: MIT

pragma solidity 0.8.19;

import {Researcher, Participant, Survey, Question, Answer, Earning, Funding} from "../utils/Structs.sol";

contract Canvassing {
    // Metamask - The Old Lad
    address canvassingOwnerWalletAddress =
        0xecE897a85688f2e83a73Fed36b9d1a6efCC99e93;

    // address - researcherWalletAddress
    mapping(address => Researcher) private allResearchers;

    // address - participantWalletAddress
    mapping(address => Participant) private allParticipants;
    Survey[] private allSurveys;

    // uint256 - surveyId
    mapping(uint256 => Question[]) private allQuestions;

    // uint256 - surveyId
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

}
