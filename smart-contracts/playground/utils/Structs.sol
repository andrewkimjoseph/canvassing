// SPDX-License-Identifier: MIT

pragma solidity 0.8.19;

struct Researcher {
    uint256 id;
    address walletAddress;
    string industry;
    uint256 yearOfIncorporation;
    bool isParticipant;
    bool isVerified;
    bool isBlank;
}

struct Participant{
    uint256 id;
    address walletAddress;
    string gender;   
    string country;
    uint256 yearOfBirth;
    uint256 totalNumberOfSurveysTaken;
    bool isResearcher;
    bool isBlank;
}

struct Survey {
    uint256 id;
    address creatingResearcherWalletAddress;
    string topic;
    uint256 numberOfQuestions;
    uint256 targetNumberOfParticipants;
    uint256 amountFundedInWei;
    bool isBlank;
}

struct Question {
    uint256 id;
    uint256 surveyId;
    string sentence;
    bool isBlank;
}

struct Answer {
    uint256 id;
    uint256 questionId;
    uint256 surveyId;
    address participantWalletAddress;
    bool value;
    bool isBlank;
}

struct Earning {
    uint256 id;
    uint256 surveyId;
    address walletAddress;
    uint256 amountPaidOutInWei;
    bool isBlank;
}

struct Funding {
    uint256 id;
    uint256 surveyId;
    address creatingResearcherWalletAddress;
    uint256 amountFundedInWei;
    bool isBlank;
}