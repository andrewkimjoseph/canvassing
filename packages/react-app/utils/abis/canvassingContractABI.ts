export const canvassingContractABI =
[
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "allAnswers",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "questionId",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "surveyId",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "participantWalletAddress",
				"type": "address"
			},
			{
				"internalType": "bool",
				"name": "value",
				"type": "bool"
			},
			{
				"internalType": "bool",
				"name": "isBlank",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "allEarnings",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "surveyId",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "recipientWalletAddress",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "amountPaidOutInWei",
				"type": "uint256"
			},
			{
				"internalType": "bool",
				"name": "isBlank",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "allFundings",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "surveyId",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "creatingResearcherWalletAddress",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "amountFundedInWei",
				"type": "uint256"
			},
			{
				"internalType": "bool",
				"name": "isBlank",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "allParticipants",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "walletAddress",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "gender",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "country",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "yearOfBirth",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "totalNumberOfSurveysTaken",
				"type": "uint256"
			},
			{
				"internalType": "bool",
				"name": "isResearcher",
				"type": "bool"
			},
			{
				"internalType": "bool",
				"name": "isBlank",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "allQuestions",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "surveyId",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "sentence",
				"type": "string"
			},
			{
				"internalType": "bool",
				"name": "isBlank",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "allResearchers",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "walletAddress",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "industry",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "numberOfEmployees",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "yearsInOperation",
				"type": "string"
			},
			{
				"internalType": "bool",
				"name": "isParticipant",
				"type": "bool"
			},
			{
				"internalType": "bool",
				"name": "isVerified",
				"type": "bool"
			},
			{
				"internalType": "bool",
				"name": "isBlank",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "allSurveys",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "creatingResearcherWalletAddress",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "topic",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "numberOfQuestions",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "targetNumberOfParticipants",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "amountFundedInWei",
				"type": "uint256"
			},
			{
				"internalType": "bool",
				"name": "isBlank",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_walletAddress",
				"type": "address"
			}
		],
		"name": "checkIfParticipantExists",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_participantWalletAddress",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "_surveyId",
				"type": "uint256"
			}
		],
		"name": "checkIfParticipantHasAlreadyParticipatedInSurvey",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_walletAddress",
				"type": "address"
			}
		],
		"name": "checkIfResearcherExists",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_numberOfQuestions",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_targetNumberOfParticipants",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_surveyId",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "_researcherWalletAddress",
				"type": "address"
			}
		],
		"name": "createFunding",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_walletAddress",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "_gender",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_country",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "_yearOfBirth",
				"type": "uint256"
			}
		],
		"name": "createParticipant",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_walletAddress",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "_industry",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_numberOfEmployees",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_yearsInOperation",
				"type": "string"
			}
		],
		"name": "createResearcher",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_researcherWalletAddress",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "_topic",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "_numberOfQuestions",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_targetNumberOfParticipants",
				"type": "uint256"
			},
			{
				"internalType": "string[]",
				"name": "_questionSentences",
				"type": "string[]"
			},
			{
				"internalType": "uint256",
				"name": "_amountFundedForSurvey",
				"type": "uint256"
			}
		],
		"name": "createSurvey",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_surveyId",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "_participantWalletAddress",
				"type": "address"
			}
		],
		"name": "getAllAnswersOfParticipantOfSurvey",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "id",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "questionId",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "surveyId",
						"type": "uint256"
					},
					{
						"internalType": "address",
						"name": "participantWalletAddress",
						"type": "address"
					},
					{
						"internalType": "bool",
						"name": "value",
						"type": "bool"
					},
					{
						"internalType": "bool",
						"name": "isBlank",
						"type": "bool"
					}
				],
				"internalType": "struct Answer[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_walletAddress",
				"type": "address"
			}
		],
		"name": "getAllEarningsMadeByParticipant",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "id",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "surveyId",
						"type": "uint256"
					},
					{
						"internalType": "address",
						"name": "recipientWalletAddress",
						"type": "address"
					},
					{
						"internalType": "uint256",
						"name": "amountPaidOutInWei",
						"type": "uint256"
					},
					{
						"internalType": "bool",
						"name": "isBlank",
						"type": "bool"
					}
				],
				"internalType": "struct Earning[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_surveyId",
				"type": "uint256"
			}
		],
		"name": "getAllQuestionsOfSurvey",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "id",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "surveyId",
						"type": "uint256"
					},
					{
						"internalType": "string",
						"name": "sentence",
						"type": "string"
					},
					{
						"internalType": "bool",
						"name": "isBlank",
						"type": "bool"
					}
				],
				"internalType": "struct Question[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getAllSurveys",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "id",
						"type": "uint256"
					},
					{
						"internalType": "address",
						"name": "creatingResearcherWalletAddress",
						"type": "address"
					},
					{
						"internalType": "string",
						"name": "topic",
						"type": "string"
					},
					{
						"internalType": "uint256",
						"name": "numberOfQuestions",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "targetNumberOfParticipants",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "amountFundedInWei",
						"type": "uint256"
					},
					{
						"internalType": "bool",
						"name": "isBlank",
						"type": "bool"
					}
				],
				"internalType": "struct Survey[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_walletAddress",
				"type": "address"
			}
		],
		"name": "getAllSurveysTakenByParticipant",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "id",
						"type": "uint256"
					},
					{
						"internalType": "address",
						"name": "creatingResearcherWalletAddress",
						"type": "address"
					},
					{
						"internalType": "string",
						"name": "topic",
						"type": "string"
					},
					{
						"internalType": "uint256",
						"name": "numberOfQuestions",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "targetNumberOfParticipants",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "amountFundedInWei",
						"type": "uint256"
					},
					{
						"internalType": "bool",
						"name": "isBlank",
						"type": "bool"
					}
				],
				"internalType": "struct Survey[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_surveyId",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_numberOfParticipants",
				"type": "uint256"
			}
		],
		"name": "getAmountOfEarningForCanvassingForSurveyPerParticipantInWei",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_surveyId",
				"type": "uint256"
			}
		],
		"name": "getAmountOfEarningPerParticipantForSurveyInWei",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_numberOfQuestions",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_targetNumberOfParticipants",
				"type": "uint256"
			}
		],
		"name": "getAmountOfFundingOfAnySurveyInWei",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_surveyId",
				"type": "uint256"
			}
		],
		"name": "getAnswersOfSurvey",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "id",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "questionId",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "surveyId",
						"type": "uint256"
					},
					{
						"internalType": "address",
						"name": "participantWalletAddress",
						"type": "address"
					},
					{
						"internalType": "bool",
						"name": "value",
						"type": "bool"
					},
					{
						"internalType": "bool",
						"name": "isBlank",
						"type": "bool"
					}
				],
				"internalType": "struct Answer[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_creatingResearcherWalletAddress",
				"type": "address"
			}
		],
		"name": "getIdOfLatestSurveyCreatedByResearcher",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_walletAddress",
				"type": "address"
			}
		],
		"name": "getParticipantByWalletAddress",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "id",
						"type": "uint256"
					},
					{
						"internalType": "address",
						"name": "walletAddress",
						"type": "address"
					},
					{
						"internalType": "string",
						"name": "gender",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "country",
						"type": "string"
					},
					{
						"internalType": "uint256",
						"name": "yearOfBirth",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "totalNumberOfSurveysTaken",
						"type": "uint256"
					},
					{
						"internalType": "bool",
						"name": "isResearcher",
						"type": "bool"
					},
					{
						"internalType": "bool",
						"name": "isBlank",
						"type": "bool"
					}
				],
				"internalType": "struct Participant",
				"name": "",
				"type": "tuple"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_surveyId",
				"type": "uint256"
			}
		],
		"name": "getParticipantsOfSurvey",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "id",
						"type": "uint256"
					},
					{
						"internalType": "address",
						"name": "walletAddress",
						"type": "address"
					},
					{
						"internalType": "string",
						"name": "gender",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "country",
						"type": "string"
					},
					{
						"internalType": "uint256",
						"name": "yearOfBirth",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "totalNumberOfSurveysTaken",
						"type": "uint256"
					},
					{
						"internalType": "bool",
						"name": "isResearcher",
						"type": "bool"
					},
					{
						"internalType": "bool",
						"name": "isBlank",
						"type": "bool"
					}
				],
				"internalType": "struct Participant[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_surveyId",
				"type": "uint256"
			}
		],
		"name": "getQuestionsOfSurvey",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "id",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "surveyId",
						"type": "uint256"
					},
					{
						"internalType": "string",
						"name": "sentence",
						"type": "string"
					},
					{
						"internalType": "bool",
						"name": "isBlank",
						"type": "bool"
					}
				],
				"internalType": "struct Question[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_walletAddress",
				"type": "address"
			}
		],
		"name": "getResearcherByWalletAddress",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "id",
						"type": "uint256"
					},
					{
						"internalType": "address",
						"name": "walletAddress",
						"type": "address"
					},
					{
						"internalType": "string",
						"name": "industry",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "numberOfEmployees",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "yearsInOperation",
						"type": "string"
					},
					{
						"internalType": "bool",
						"name": "isParticipant",
						"type": "bool"
					},
					{
						"internalType": "bool",
						"name": "isVerified",
						"type": "bool"
					},
					{
						"internalType": "bool",
						"name": "isBlank",
						"type": "bool"
					}
				],
				"internalType": "struct Researcher",
				"name": "",
				"type": "tuple"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_surveyId",
				"type": "uint256"
			}
		],
		"name": "getSurveyById",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "id",
						"type": "uint256"
					},
					{
						"internalType": "address",
						"name": "creatingResearcherWalletAddress",
						"type": "address"
					},
					{
						"internalType": "string",
						"name": "topic",
						"type": "string"
					},
					{
						"internalType": "uint256",
						"name": "numberOfQuestions",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "targetNumberOfParticipants",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "amountFundedInWei",
						"type": "uint256"
					},
					{
						"internalType": "bool",
						"name": "isBlank",
						"type": "bool"
					}
				],
				"internalType": "struct Survey",
				"name": "",
				"type": "tuple"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_researcherWalletAddress",
				"type": "address"
			}
		],
		"name": "getSurveysCreatedByResearcher",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "id",
						"type": "uint256"
					},
					{
						"internalType": "address",
						"name": "creatingResearcherWalletAddress",
						"type": "address"
					},
					{
						"internalType": "string",
						"name": "topic",
						"type": "string"
					},
					{
						"internalType": "uint256",
						"name": "numberOfQuestions",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "targetNumberOfParticipants",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "amountFundedInWei",
						"type": "uint256"
					},
					{
						"internalType": "bool",
						"name": "isBlank",
						"type": "bool"
					}
				],
				"internalType": "struct Survey[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_creatingResearcherWalletAddress",
				"type": "address"
			}
		],
		"name": "getTotalAmountFundedByResearcherInWei",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_walletAddress",
				"type": "address"
			}
		],
		"name": "getTotalAmountOfEarningsReceivedByParticipantInWei",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_creatingResearcherWalletAddress",
				"type": "address"
			}
		],
		"name": "getTotalNumberOfSurveyCreatedByResearcher",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "idsOfLatestSurveysCreatedByResearchers",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_surveyId",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "_participantWalletAddress",
				"type": "address"
			}
		],
		"name": "makePayoutAndCreateEarning",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "participantsOfSurvey",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "walletAddress",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "gender",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "country",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "yearOfBirth",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "totalNumberOfSurveysTaken",
				"type": "uint256"
			},
			{
				"internalType": "bool",
				"name": "isResearcher",
				"type": "bool"
			},
			{
				"internalType": "bool",
				"name": "isBlank",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_surveyId",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "_participantWalletAddress",
				"type": "address"
			},
			{
				"internalType": "bool[]",
				"name": "_answerValues",
				"type": "bool[]"
			},
			{
				"internalType": "uint256[]",
				"name": "_questionIds",
				"type": "uint256[]"
			}
		],
		"name": "participateInSurvey",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "participationStatusForSurvey",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "payoutStatusOfParticipantForSurvey",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "totalAmountFundedByResearchersInWei",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "totalNumberOfSurveysCreatedByResearchers",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_walletAddress",
				"type": "address"
			}
		],
		"name": "verifyResearcher",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	}
]