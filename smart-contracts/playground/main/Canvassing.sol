// SPDX-License-Identifier: MIT

pragma solidity 0.8.19;

import {Researcher, Participant, Survey, Question, Answer, Earning, Funding} from "../utils/Structs.sol";
import {ERC20} from "../utils/Interfaces.sol";

contract Canvassing {
    // Metamask - The Old Lad
    address canvassingWalletAddress =
        0xecE897a85688f2e83a73Fed36b9d1a6efCC99e93;

    // address - {researcherWalletAddress}
    mapping(address => Researcher) public allResearchers;

    // address - {participantWalletAddress}
    mapping(address => Participant) public allParticipants;
    Survey[] public allSurveys;

    // uint256 - {surveyId}
    mapping(uint256 => Question[]) public allQuestions;

    // uint256 - {surveyId}
    mapping(uint256 => Answer[]) public allAnswers;

    // uint256 - {surveyId}
    mapping(uint256 => mapping(address => bool))
        public participationStatusForSurvey;

    // uint256 - {surveyId}, address - {participantWalletAddress}
    mapping(uint256 => mapping(address => bool))
        public payoutStatusOfParticipantForSurvey;

    // address - {creatingResearcherWalletAddress}
    mapping(address => uint256) public totalNumberOfSurveysCreatedByResearchers;

    // address - {creatingResearcherWalletAddress}

    mapping(address => uint256) public totalAmountFundedByResearchersInWei;

    // uint256 - {surveyId}
    mapping(uint256 => Participant[]) public participantsOfSurvey;

    Funding[] public allFundings;

    Earning[] public allEarnings;

    // GLOBAL
    uint256 currentResearcherId;
    uint256 currentParticipantId;
    uint256 currentSurveyId;
    uint256 currentQuestionId;
    uint256 currentAnswerId;
    uint256 currentEarningId;
    uint256 currentFundingId;

    
    // CUSD
    ERC20 cUSD = ERC20(0x874069Fa1Eb16D44d622F2e0Ca25eeA172369bC1);

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

        currentParticipantId++;
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

            if (runningEarning.walletAddress == _walletAddress) {
                allEarningsMadeByParticipant[earningIndex] = runningEarning;
                earningIndex++;
            }

            if (earningIndex == totalNumberOfSurveysTakenByParticipant) {
                break;
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

    function getTotalAmountOfEarningsReceivedByParticipantInWei(
        address _walletAddress
    ) public view returns (uint256) {
        uint256 totalNumberOfSurveysTakenByParticipant = allParticipants[
            _walletAddress
        ].totalNumberOfSurveysTaken;

        Earning[] memory allEarningsMadeByParticipant = new Earning[](
            totalNumberOfSurveysTakenByParticipant
        );

        uint256 totalAmountOfEarningsReceivedByParticipantInWei = 0;

        for (
            uint256 earningId = 0;
            earningId < allEarningsMadeByParticipant.length;
            earningId++
        ) {
            Earning memory runningEarning = allEarningsMadeByParticipant[
                earningId
            ];
            totalAmountOfEarningsReceivedByParticipantInWei += runningEarning
                .amountPaidOutInWei;
        }
        return totalAmountOfEarningsReceivedByParticipantInWei;
    }

    function getAllQuestionsOfSurvey(uint256 _surveyId)
        public
        view
        returns (Question[] memory)
    {
        return allQuestions[_surveyId];
    }

    function getAllAnswersOfParticipantOfSurvey(
        uint256 _surveyId,
        address _participantWalletAddress
    ) public view returns (Answer[] memory) {
        Survey memory currentSurvey = allSurveys[_surveyId];
        Answer[] memory allAnswersOfSurvey = allAnswers[_surveyId];

        uint256 totalNumberOfAnswersOfParticipantOfSurvey = currentSurvey
            .numberOfQuestions;

        Answer[] memory allAnswersOfParticipantOfSurvey = new Answer[](
            totalNumberOfAnswersOfParticipantOfSurvey
        );

        uint256 answerIndex = 0;

        for (
            uint256 answerId = 0;
            answerId < allAnswersOfSurvey.length;
            answerId++
        ) {
            Answer memory runningAnswer = allAnswersOfSurvey[answerId];

            if (
                runningAnswer.participantWalletAddress ==
                _participantWalletAddress
            ) {
                allAnswersOfParticipantOfSurvey[answerIndex] = runningAnswer;
                answerIndex++;
            }

            if (answerIndex == totalNumberOfAnswersOfParticipantOfSurvey) {
                break;
            }
        }
        return allAnswersOfParticipantOfSurvey;
    }

    function checkIfParticipantHasAlreadyParticipatedInSurvey(
        address _participantWalletAddress,
        uint256 _surveyId
    ) public view returns (bool) {
        return
            participationStatusForSurvey[_surveyId][_participantWalletAddress];
    }

    function getAmountOfFundingOfAnySurveyInWei(
        uint256 _numberOfQuestions,
        uint256 _targetNumberOfParticipants
    ) public view returns (uint256) {
        uint256 potentialFundingOfAnySurveyInWei = 0;

        // Number of {Question}
        potentialFundingOfAnySurveyInWei += _numberOfQuestions;

        // Target Number of {Participant}
        if (_targetNumberOfParticipants == 5) {
            potentialFundingOfAnySurveyInWei += 2;
        }

        if (_targetNumberOfParticipants == 7) {
            potentialFundingOfAnySurveyInWei += 4;
        }

        if (_targetNumberOfParticipants == 9) {
            potentialFundingOfAnySurveyInWei += 6;
        }

        return potentialFundingOfAnySurveyInWei * (10**cUSD.decimals());
    }

    function getAmountOfEarningPerParticipantForSurveyInWei(uint256 _surveyId)
        public
        view
        returns (uint256)
    {
        Survey memory currentSurvey = allSurveys[_surveyId];

        uint256 amountFundedInWei = currentSurvey.amountFundedInWei;
        uint256 targetNumberOfParticipants = currentSurvey
            .targetNumberOfParticipants;

        uint256 participantRevenueSharingPoolAmount = (amountFundedInWei * 5) /
            10;

        uint256 potentialEarningPerParticipantForSurveyInWei = participantRevenueSharingPoolAmount /
                targetNumberOfParticipants;

        return
            potentialEarningPerParticipantForSurveyInWei *
            (10**cUSD.decimals());
    }

    function getAmountOfEarningForCanvassingForSurveyPerParticipantInWei(
        uint256 _surveyId,
        uint256 _numberOfParticipants
    ) public view returns (uint256) {
        Survey memory currentSurvey = allSurveys[_surveyId];
        uint256 amountFundedInWei = currentSurvey.amountFundedInWei;
        uint256 canvassingShareAmountPerParticipant = ((amountFundedInWei * 5) /
            10) / _numberOfParticipants;

        return canvassingShareAmountPerParticipant * (10**cUSD.decimals());
    }

    function participateInSurvey(
        uint256 _surveyId,
        address _participantWalletAddress,
        bool[] memory _answerValues
    ) public {
        Survey memory currentSurvey = allSurveys[_surveyId];

        uint256 numberOfExpectedAnswers = currentSurvey.numberOfQuestions;

        // 1. Create {Answer}s of {Question}s of {Survey}
        for (
            uint256 answerId = 0;
            answerId < numberOfExpectedAnswers;
            answerId++
        ) {
            Answer memory newAnswer;
            uint256 newAnswerId = currentAnswerId;
            newAnswer.id = newAnswerId;
            newAnswer.questionId = answerId;
            newAnswer.surveyId = _surveyId;
            newAnswer.participantWalletAddress = _participantWalletAddress;
            newAnswer.value = _answerValues[answerId];
            allAnswers[_surveyId].push(newAnswer);
            currentAnswerId++;
        }

        // Update the participation status of {Participant} in {Survey}
        participationStatusForSurvey[_surveyId][
            _participantWalletAddress
        ] = true;

        participantsOfSurvey[_surveyId].push(
            getParticipantByWalletAddress(_participantWalletAddress)
        );
    }

    function makePayoutAndCreateEarning(
        uint256 _surveyId,
        address _participantWalletAddress
    ) public {
        Survey memory currentSurvey = allSurveys[_surveyId];

        // Make payout to {Participant}
        uint256 amountToBePaidOutToParticipantInWei = getAmountOfEarningPerParticipantForSurveyInWei(
                _surveyId
            );
        (_surveyId);

        cUSD.transfer(
            _participantWalletAddress,
            amountToBePaidOutToParticipantInWei
        );

        // Make payout to {canvassingWalletAddress} - owner
        uint256 amountToBePaidOutToCanvassingInWei = getAmountOfEarningForCanvassingForSurveyPerParticipantInWei(
                _surveyId,
                currentSurvey.targetNumberOfParticipants
            );

        cUSD.transfer(
            canvassingWalletAddress,
            amountToBePaidOutToCanvassingInWei
        );

        // Create new {Earning} for {Participant}
        Earning memory newParticipantEarning;
        newParticipantEarning.id = currentEarningId;
        newParticipantEarning.surveyId = _surveyId;
        newParticipantEarning.walletAddress = _participantWalletAddress;
        newParticipantEarning
            .amountPaidOutInWei = amountToBePaidOutToParticipantInWei;
        newParticipantEarning.isBlank = false;
        allEarnings.push(newParticipantEarning);
        currentEarningId++;
        payoutStatusOfParticipantForSurvey[_surveyId][
            _participantWalletAddress
        ] = true;

        // Create new {Earning} for {canvassingWalletAddress}
        Earning memory newCanvassingEarning;
        newCanvassingEarning.id = currentEarningId;
        newCanvassingEarning.surveyId = _surveyId;
        newCanvassingEarning.walletAddress = canvassingWalletAddress;
        newCanvassingEarning
            .amountPaidOutInWei = amountToBePaidOutToCanvassingInWei;
        newCanvassingEarning.isBlank = false;
        allEarnings.push(newCanvassingEarning);
        currentEarningId++;
    }

    function checkIfResearcherExists(address _walletAddress)
        public
        view
        returns (bool)
    {
        return allResearchers[_walletAddress].isBlank ? false : true;
    }

    function getResearcherByWalletAddress(address _walletAddress)
        public
        view
        returns (Researcher memory)
    {
        return allResearchers[_walletAddress];
    }

    function createResearcher(
        address _walletAddress,
        string memory _industry,
        uint256 _yearOfCorporation
    ) public {
        uint256 newResearcherId = currentResearcherId;

        Researcher memory newResearcher;
        newResearcher.id = newResearcherId;
        newResearcher.walletAddress = _walletAddress;
        newResearcher.industry = _industry;
        newResearcher.yearOfIncorporation = _yearOfCorporation;
        newResearcher.isParticipant = false;
        newResearcher.isVerified = false;
        newResearcher.isBlank = false;
        currentResearcherId++;
    }

    function getTotalNumberOfSurveyCreatedByResearcher(
        address _creatingResearcherWalletAddress
    ) public view returns (uint256) {
        return
            totalNumberOfSurveysCreatedByResearchers[
                _creatingResearcherWalletAddress
            ];
    }

    function getTotalAmountFundedByResearchersInWei(
        address _creatingResearcherWalletAddress
    ) public view returns (uint256) {
        return
            totalAmountFundedByResearchersInWei[
                _creatingResearcherWalletAddress
            ];
    }

    function getSurveysCreatedByResearcher(address _researcherWalletAddress)
        public
        view
        returns (Survey[] memory)
    {
        uint256 totalNumberOfSurveysCreatedByResearcher = totalNumberOfSurveysCreatedByResearchers[
                _researcherWalletAddress
            ];

        Survey[] memory allSurveysCreatedByResearcher = new Survey[](
            totalNumberOfSurveysCreatedByResearcher
        );

        uint256 surveyIndex = 0;

        for (uint256 surveyId = 0; surveyId < allSurveys.length; surveyId++) {
            Survey memory runningSurvey = allSurveys[surveyId];

            if (
                runningSurvey.creatingResearcherWalletAddress ==
                _researcherWalletAddress
            ) {
                allSurveysCreatedByResearcher[surveyIndex] = runningSurvey;
                surveyIndex++;
            }

            if (surveyIndex == totalNumberOfSurveysCreatedByResearcher) {
                break;
            }
        }

        return allSurveysCreatedByResearcher;
    }

    function createFunding(
        uint256 _numberOfQuestions,
        uint256 _targetNumberOfParticipants,
        uint256 _surveyId,
        address _researcherWalletAddress
    ) public {
        uint256 amountOfFundingOfSurveyInWei = getAmountOfFundingOfAnySurveyInWei(
                _numberOfQuestions,
                _targetNumberOfParticipants
            );

        uint256 newFundingId = currentFundingId;

        Funding memory newFunding;

        newFunding.id = newFundingId;
        newFunding.surveyId = _surveyId;
        newFunding.creatingResearcherWalletAddress = _researcherWalletAddress;
        newFunding.amountFundedInWei = amountOfFundingOfSurveyInWei;
        newFunding.isBlank = false;

        allFundings.push(newFunding);

        uint256 currentTotalAmountFundedByResearcherInWei = totalAmountFundedByResearchersInWei[
                _researcherWalletAddress
            ];

        totalAmountFundedByResearchersInWei[
            _researcherWalletAddress
        ] = currentTotalAmountFundedByResearcherInWei += amountOfFundingOfSurveyInWei;

        // Increment the GLOBAL {currentFundingId}
        currentFundingId++;
    }

    function verifyResearcher(address _walletAddress) public {
        Researcher memory currentResearcher = allResearchers[_walletAddress];
        currentResearcher.isVerified = true;
        allResearchers[_walletAddress] = currentResearcher;
    }

    function createSurvey(
        address _researcherWalletAddress,
        string memory _topic,
        uint256 _numberOfQuestions,
        uint256 _targetNumberOfParticipants,
        string[] memory _questionSentences,
        uint256 _amountFundedForSurvey
    ) public {
        uint256 newSurveyId = currentSurveyId;

        // Create {Survey} first
        Survey memory newSurvey;
        newSurvey.id = newSurveyId;
        newSurvey.creatingResearcherWalletAddress = _researcherWalletAddress;
        newSurvey.topic = _topic;
        newSurvey.numberOfQuestions = _numberOfQuestions;
        newSurvey.targetNumberOfParticipants = _targetNumberOfParticipants;
        newSurvey.amountFundedInWei = _amountFundedForSurvey;
        newSurvey.isBlank = false;
        allSurveys.push(newSurvey);

        uint256 currentTotalNumberOfSurveysCreatedByResearcher = totalNumberOfSurveysCreatedByResearchers[
                _researcherWalletAddress
            ];

        totalNumberOfSurveysCreatedByResearchers[
            _researcherWalletAddress
        ] = currentTotalNumberOfSurveysCreatedByResearcher++;

        // Create each {Question} and add it to {allQuestions}
        for (
            uint256 questionIndex = 0;
            questionIndex < _numberOfQuestions;
            questionIndex++
        ) {
            uint256 newQuestionId = currentQuestionId;

            Question memory newQuestion;
            newQuestion.id = newQuestionId;
            newQuestion.surveyId = newSurvey.id;
            newQuestion.sentence = _questionSentences[questionIndex];
            newQuestion.isBlank = false;
            allQuestions[newSurvey.id].push(newQuestion);

            // Increment the GLOBAL {currentQuestionId}
            currentQuestionId++;
        }

        // Increment the GLOBAL {currentSurveyId}
        currentSurveyId++;
    }

    function getParticipantsOfSurvey(uint256 _surveyId)
        public
        view
        returns (Participant[] memory)
    {
        return participantsOfSurvey[_surveyId];
    }

    function getAnswersOfSurvey(uint256 _surveyId)
        public
        view
        returns (Answer[] memory)
    {
        return allAnswers[_surveyId];
    }
}
