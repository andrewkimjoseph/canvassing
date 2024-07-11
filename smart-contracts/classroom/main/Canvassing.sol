// SPDX-License-Identifier: MIT

pragma solidity 0.8.19;

import {Researcher, Participant, Survey, Question, Answer, Earning, Funding} from "../utils/Structs.sol";
import {ERC20} from "../utils/Interfaces.sol";

contract Canvassing {
    //  Metamask - The Old Lad
    address canvassingWalletAddress =
        0xecE897a85688f2e83a73Fed36b9d1a6efCC99e93;

    //  address - {researcherWalletAddress}
    mapping(address => Researcher) public allResearchers;

    //  address - {participantWalletAddress}
    mapping(address => Participant) public allParticipants;
    Survey[] public allSurveys;

    //  uint256 - {surveyId}
    mapping(uint256 => Question[]) public allQuestions;

    //  uint256 - {surveyId}
    mapping(uint256 => Answer[]) public allAnswers;

    //  uint256 - {surveyId}
    mapping(uint256 => mapping(address => bool))
        public participationStatusForSurvey;

    //  uint256 - {surveyId}, address - {participantWalletAddress}
    mapping(uint256 => mapping(address => bool))
        public payoutStatusOfParticipantForSurvey;

    //  address - {creatingResearcherWalletAddress}
    mapping(address => uint256) public totalNumberOfSurveysCreatedByResearchers;

    //  address - {creatingResearcherWalletAddress}

    mapping(address => uint256) public totalAmountFundedByResearchersInWei;

    //  address - {creatingResearcherWalletAddress}
    mapping(address => uint256) public idsOfLatestSurveysCreatedByResearchers;

    //  uint256 - {surveyId}
    mapping(uint256 => Participant[]) public participantsOfSurvey;

    Funding[] public allFundings;

    Earning[] public allEarnings;

    //  GLOBALS
    uint256 currentResearcherId;
    uint256 currentParticipantId;
    uint256 currentSurveyId;
    uint256 currentQuestionId;
    uint256 currentAnswerId;
    uint256 currentEarningId;
    uint256 currentFundingId;

    //  CUSD
    ERC20 cUSD = ERC20(0x874069Fa1Eb16D44d622F2e0Ca25eeA172369bC1);
    uint256 cUSDDecimalPlaces = 10**(cUSD.decimals());

    function checkIfParticipantExists(address _walletAddress)
        public
        view
        returns (bool)
    {
        return
            allParticipants[_walletAddress].walletAddress == _walletAddress
                ? true
                : false;
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

        // Check if {_walletAddress} is a {Researcher}

        if (checkIfResearcherExists(_walletAddress)) {
            Researcher memory existingResearcher = getResearcherByWalletAddress(
                _walletAddress
            );

            existingResearcher.isParticipant = true;

            newParticipant.isResearcher = true;

            allResearchers[_walletAddress] = existingResearcher;
        }

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

            if (runningEarning.recipientWalletAddress == _walletAddress) {
                allEarningsMadeByParticipant[earningIndex] = runningEarning;
                earningIndex++;

                if (earningIndex == totalNumberOfSurveysTakenByParticipant) {
                    break;
                }
            }
        }

        return allEarningsMadeByParticipant;
    }

    function getAllSurveysTakenByParticipant(address _walletAddress)
        public
        view
        returns (Survey[] memory)
    {
        //  Get the particular {Earning[]} made by the {Participant} for taking the {Survey}
        Earning[]
            memory allEarningsMadeByParticipant = getAllEarningsMadeByParticipant(
                _walletAddress
            );

        Survey[] memory allSurveysTakenByParticipant = new Survey[](
            allEarningsMadeByParticipant.length
        );
        uint256 surveyIndex = 0;

        //  Get the {surveyId} in the {Earning} and use them to get the particular {Survey}

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

                if (answerIndex == totalNumberOfAnswersOfParticipantOfSurvey) {
                    break;
                }
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

        //  Number of {Question}s
        //  1 question == 1 cUSD Ether or 1000000000000000000 cUSD Wei (18 d.p.)
        potentialFundingOfAnySurveyInWei += (_numberOfQuestions *
            cUSDDecimalPlaces);
        //  Target Number of {Participant}
        if (_targetNumberOfParticipants == 5) {
            potentialFundingOfAnySurveyInWei += (2 * cUSDDecimalPlaces);
        }

        if (_targetNumberOfParticipants == 7) {
            potentialFundingOfAnySurveyInWei += (4 * cUSDDecimalPlaces);
        }

        if (_targetNumberOfParticipants == 9) {
            potentialFundingOfAnySurveyInWei += (6 * cUSDDecimalPlaces);
        }

        return potentialFundingOfAnySurveyInWei;
    }

    function getAmountOfEarningPerParticipantForSurveyInWei(uint256 _surveyId)
        public
        view
        returns (uint256)
    {
        Survey memory currentSurvey = allSurveys[_surveyId];

        uint256 amountFundedInWeiForSurvey = currentSurvey.amountFundedInWei;
        uint256 targetNumberOfParticipants = currentSurvey
            .targetNumberOfParticipants;

        uint256 participantRevenueSharingPoolAmountInWei = (amountFundedInWeiForSurvey *
                5) / 10;

        uint256 amountOfEarningPerParticipantForSurveyInWei = participantRevenueSharingPoolAmountInWei /
                targetNumberOfParticipants;

        return amountOfEarningPerParticipantForSurveyInWei;
    }

    function getAmountOfEarningForCanvassingForSurveyPerParticipantInWei(
        uint256 _surveyId,
        uint256 _numberOfParticipants
    ) public view returns (uint256) {
        Survey memory currentSurvey = allSurveys[_surveyId];
        uint256 amountFundedInWeiForSurvey = currentSurvey.amountFundedInWei;
        uint256 canvassingShareAmountPerParticipantInWei = ((amountFundedInWeiForSurvey *
                5) / 10) / _numberOfParticipants;

        return canvassingShareAmountPerParticipantInWei;
    }

    function participateInSurvey(
        uint256 _surveyId,
        address _participantWalletAddress,
        bool[] memory _answerValues
    ) public {
        Participant memory currentParticipant = allParticipants[
            _participantWalletAddress
        ];

        Survey memory currentSurvey = allSurveys[_surveyId];

        uint256 numberOfExpectedAnswers = currentSurvey.numberOfQuestions;

        //  Create {Answer}s of {Question}s of {Survey}
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

        //  Update the participation status of {Participant} in {Survey}
        participationStatusForSurvey[_surveyId][
            _participantWalletAddress
        ] = true;

        //  Add {Participant} to the list of {Participant}s of {Survey}
        participantsOfSurvey[_surveyId].push(
            getParticipantByWalletAddress(_participantWalletAddress)
        );

        //  Update the {Participant.totalNumberOfSurveysTaken} by incrementing it by 1
        currentParticipant.totalNumberOfSurveysTaken += 1;

        //  Update the {Participant}
        allParticipants[_participantWalletAddress] = currentParticipant;
    }

    function makePayoutAndCreateEarning(
        uint256 _surveyId,
        address _participantWalletAddress
    ) public {
        Survey memory currentSurvey = allSurveys[_surveyId];

        //  Make payout to {Participant}
        uint256 amountToBePaidOutToParticipantInWei = getAmountOfEarningPerParticipantForSurveyInWei(
                _surveyId
            );

        cUSD.transfer(
            _participantWalletAddress,
            amountToBePaidOutToParticipantInWei
        );

        //  Make payout to {canvassingWalletAddress} - owner
        uint256 amountToBePaidOutToCanvassingInWei = getAmountOfEarningForCanvassingForSurveyPerParticipantInWei(
                _surveyId,
                currentSurvey.targetNumberOfParticipants
            );

        cUSD.transfer(
            canvassingWalletAddress,
            amountToBePaidOutToCanvassingInWei
        );

        //  Create new {Earning} for {Participant}
        Earning memory newParticipantEarning;
        newParticipantEarning.id = currentEarningId;
        newParticipantEarning.surveyId = _surveyId;
        newParticipantEarning
            .recipientWalletAddress = _participantWalletAddress;
        newParticipantEarning
            .amountPaidOutInWei = amountToBePaidOutToParticipantInWei;
        allEarnings.push(newParticipantEarning);
        currentEarningId++;
        payoutStatusOfParticipantForSurvey[_surveyId][
            _participantWalletAddress
        ] = true;

        //  Create new {Earning} for {canvassingWalletAddress}
        Earning memory newCanvassingEarning;
        newCanvassingEarning.id = currentEarningId;
        newCanvassingEarning.surveyId = _surveyId;
        newCanvassingEarning.recipientWalletAddress = canvassingWalletAddress;
        newCanvassingEarning
            .amountPaidOutInWei = amountToBePaidOutToCanvassingInWei;
        allEarnings.push(newCanvassingEarning);
        currentEarningId++;
    }

    function checkIfResearcherExists(address _walletAddress)
        public
        view
        returns (bool)
    {
        return
            allResearchers[_walletAddress].walletAddress == _walletAddress
                ? true
                : false;
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
        string memory _numberOfEmployees,
        string memory _yearsInOperation
    ) public {
        uint256 newResearcherId = currentResearcherId;

        Researcher memory newResearcher;
        newResearcher.id = newResearcherId;
        newResearcher.walletAddress = _walletAddress;
        newResearcher.industry = _industry;
        newResearcher.numberOfEmployees = _numberOfEmployees;
        newResearcher.yearsInOperation = _yearsInOperation;
        newResearcher.isVerified = false;

        //  Check if {_walletAddress} is a {Researcher}

        if (checkIfParticipantExists(_walletAddress)) {
            Participant
                memory existingParticipant = getParticipantByWalletAddress(
                    _walletAddress
                );
            (_walletAddress);

            existingParticipant.isResearcher = true;

            newResearcher.isParticipant = true;

            allParticipants[_walletAddress] = existingParticipant;
        }

        allResearchers[_walletAddress] = newResearcher;
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

    function getTotalAmountFundedByResearcherInWei(
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

                if (surveyIndex == totalNumberOfSurveysCreatedByResearcher) {
                    break;
                }
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

        allFundings.push(newFunding);

        uint256 currentTotalAmountFundedByResearcherInWei = totalAmountFundedByResearchersInWei[
                _researcherWalletAddress
            ];

        totalAmountFundedByResearchersInWei[
            _researcherWalletAddress
        ] = currentTotalAmountFundedByResearcherInWei += amountOfFundingOfSurveyInWei;

        //  Increment the GLOBAL {currentFundingId}
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
    ) public returns (uint256) {
        uint256 newSurveyId = currentSurveyId;

        //  Create {Survey} first
        Survey memory newSurvey;
        newSurvey.id = newSurveyId;
        newSurvey.creatingResearcherWalletAddress = _researcherWalletAddress;
        newSurvey.topic = _topic;
        newSurvey.numberOfQuestions = _numberOfQuestions;
        newSurvey.targetNumberOfParticipants = _targetNumberOfParticipants;
        newSurvey.amountFundedInWei = (_amountFundedForSurvey *
            cUSDDecimalPlaces);
        allSurveys.push(newSurvey);

        idsOfLatestSurveysCreatedByResearchers[
            _researcherWalletAddress
        ] = newSurvey.id;
        uint256 currentTotalNumberOfSurveysCreatedByResearcher = totalNumberOfSurveysCreatedByResearchers[
                _researcherWalletAddress
            ];

        uint256 newestTotalNumberOfSurveysCreatedByResearcher = currentTotalNumberOfSurveysCreatedByResearcher +
                1;

        totalNumberOfSurveysCreatedByResearchers[
            _researcherWalletAddress
        ] = newestTotalNumberOfSurveysCreatedByResearcher;

        //  Create each {Question} and add it to {allQuestions}
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
            allQuestions[newSurvey.id].push(newQuestion);

            //  Increment the GLOBAL {currentQuestionId}
            currentQuestionId++;
        }

        //  Increment the GLOBAL {currentSurveyId}
        currentSurveyId++;

        return newSurvey.id;
    }

    function getIdsOfLatestSurveysCreatedByResearchers(
        address _creatingResearcherWalletAddress
    ) public view returns (uint256) {
        return
            idsOfLatestSurveysCreatedByResearchers[
                _creatingResearcherWalletAddress
            ];
    }

    function getParticipantsOfSurvey(uint256 _surveyId)
        public
        view
        returns (Participant[] memory)
    {
        return participantsOfSurvey[_surveyId];
    }

    function getQuestionsOfSurvey(uint256 _surveyId)
        public
        view
        returns (Question[] memory)
    {
        return allQuestions[_surveyId];
    }

    function getAnswersOfSurvey(uint256 _surveyId)
        public
        view
        returns (Answer[] memory)
    {
        return allAnswers[_surveyId];
    }
}

//  EOA ADDRESSES
//  The Old Lord:   0xdaB7EB2409fdD974CF93357C61aEA141729AEfF5
//  The Old Lady:   0x1c30082ae6F51E31F28736be3f715261223E4EDe
//  The Old Lad:    0xecE897a85688f2e83a73Fed36b9d1a6efCC99e93
//  The Old Lass:   0x89878e9744AF84c091063543688C488d393E8912
//  The New Lord:   0xE49B05F2c7DD51f61E415E1DFAc10B80074B001A

//  SMART CONTRACT ADDRESSES
//  First:          0xCE2A4c4bEAf92c87ECdbF832b21ac62610b2b4E6
//  Second:         0xAC47D428C5f5aFCd20fe2B4826b4E86994C8A332
//  Third:          0x13Cf04C9A825902e3F1B25d92176496242EECaFE
//  Fourth:         0x55a9F3cab136ac3b73403d767a527b4675afF107
//  Fifth:          0x3d5e1f13b84AE83025b2E8A0241ebf8d8b26af21
//  Sixth:          0x82737595aC43c7432eb2285DA98D2Fd3D09f8957
//  FINAL:          0x96DfF6919687F2103Ce71DDD17BC1B53292d1561
//  FINAL 2:        0x05cF04DaCC70d128E383ea3c5E75DC1C11A5dcC3
//  FINAL 3:        0x2323C0180c78149826C9a02ea8A675407C165CdA
//  ...
