import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Divider,
  Spinner,
  Text,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { Participant } from "@/entities/Participant";
import { Question } from "@/entities/Question";
import { Answer } from "@/entities/Answer";
import { getParticipantsOfSurvey } from "@/services/getParticipantsOfSurvey";
import { getQuestionsOfSurvey } from "@/services/getQuestionsOfSurvey";
import { getAnswersOfSurvey } from "@/services/getAnswersOfSurvey";

import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { fonts } from "@/fonts/fonts";
import { pieChartDummyData } from "@/utils/data/pieChartDummyData";
import { PieChartDataInterface } from "@/utils/data/pieChartDataInterface";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function ResearcherParticularCreatedSurveyView() {
  const [userAddress, setUserAddress] = useState("");
  const [isMounted, setIsMounted] = useState(false);
  const { address, isConnected } = useAccount();

  const [isLoadingGenderData, setIsLoadingGenderData] = useState(false);
  const [isLoadingCountryData, setIsLoadingCountryData] = useState(false);

  const [isLoadingAgeData, setIsLoadingAgeData] = useState(false);

  const [isLoadingQuestionData, setIsLoadingQuestionData] = useState(false);

  const [averageAge, setAverageAge] = useState(0);

  const router = useRouter();
  const { id } = router.query;

  const surveyId: number = Number(id);

  const [allParticipantsOfSurvey, setAllParticipantsOfSurvey] = useState<
    Participant[]
  >([]);

  const [allQuestionsOfSurvey, setAllQuestionsOfSurvey] = useState<Question[]>(
    []
  );

  const [genderData, setGenderData] = useState<PieChartDataInterface | null>(
    null
  );

  const [countryData, setCountryData] = useState<PieChartDataInterface | null>(
    null
  );
  const [questionData, setQuestionData] = useState<
    (PieChartDataInterface | null)[]
  >([]);

  useEffect(() => {
    const getAllParticipantsOfSurvey = async () => {
      const fetchedParticipants = await getParticipantsOfSurvey(address, {
        _surveyId: surveyId,
      });
      setAllParticipantsOfSurvey(fetchedParticipants);
    };

    const getAllQuestionsOfSurvey = async () => {
      const fetchedQuestions = await getQuestionsOfSurvey(address, {
        _surveyId: surveyId,
      });
      setAllQuestionsOfSurvey(fetchedQuestions);
    };

    getAllParticipantsOfSurvey();
    getAllQuestionsOfSurvey();
  }, []);

  useEffect(() => {
    // let questionAndAnswerMapping: {
    //   [key: number]: { [key: string]: number };
    // } = {};
    const getQuestionAndAnswerData = async () => {
      setIsLoadingQuestionData(true);
      const questionsDataForPieChart: (PieChartDataInterface | null)[] = [];

      const allAnswers = await getAnswersOfSurvey(address, {
        _surveyId: surveyId,
      });

      const allQuestionsOfSurvey = await getQuestionsOfSurvey(address, {
        _surveyId: surveyId,
      });

      for (
        let questionId = 0;
        questionId < allQuestionsOfSurvey.length;
        questionId++
      ) {
        const question = allQuestionsOfSurvey[questionId];

        // questionAndAnswerMapping[question.id] = {
        //   true: 0,
        //   false: 0,
        // };

        const questionDataForPieChart: PieChartDataInterface = {
          labels: ["True", "False"],
          datasets: [
            {
              label: "# of Responses",
              data: [0, 0],
              backgroundColor: [
                "rgba(255, 99, 132, 0.2)",
                "rgba(54, 162, 235, 0.2)",
                "rgba(255, 206, 86, 0.2)",
              ],
              borderColor: [
                "rgba(255, 99, 132, 1)",
                "rgba(54, 162, 235, 1)",
                "rgba(255, 206, 86, 1)",
              ],
              borderWidth: 1,
            },
          ],
        };

        for (let answerId = 0; answerId < allAnswers.length; answerId++) {
          const answer = allAnswers[answerId];
          if (answer.questionId === question.id) {
            const truePoint: number = answer.value === true ? 1 : 0;
            const falsePoint: number = answer.value === false ? 1 : 0;

            // questionAndAnswerMapping[question.id]["true"] += truePoint;

            // questionAndAnswerMapping[question.id]["false"] += falsePoint;

            questionDataForPieChart.datasets[0].data[0] += truePoint;
            questionDataForPieChart.datasets[0].data[1] += falsePoint;

            // questionsDataForPieChart.push(questionDataForPieChart);
          }
        }

        questionsDataForPieChart.push(questionDataForPieChart);
      }

      setQuestionData(questionsDataForPieChart);

      setIsLoadingQuestionData(false);

    };

    getQuestionAndAnswerData();
  }, []);

  useEffect(() => {
    const setDataForGenderPieChart = async () => {
      setIsLoadingCountryData(true);
      const genderLabels = ["Male", "Female", "Other"];
      const genderData: { [key: string]: number } = {};

      genderData[genderLabels[0]] = 0;
      genderData[genderLabels[1]] = 0;
      genderData[genderLabels[2]] = 0;

      const allParticipantsOfSurvey = await getParticipantsOfSurvey(address, {
        _surveyId: surveyId,
      });

      for (
        let participantId = 0;
        participantId < allParticipantsOfSurvey.length;
        participantId++
      ) {
        const participant = allParticipantsOfSurvey[participantId];
        if (participant.gender === "M") {
          genderData["Male"] += 1;
        }
        if (participant.gender === "F") {
          genderData["Female"] += 1;
        }
        if (participant.gender === "O") {
          genderData["Other"] += 1;
        }
      }

      setGenderData({
        labels: genderLabels,
        datasets: [
          {
            label: "# of Responses",
            data: [
              genderData[genderLabels[0]],
              genderData[genderLabels[1]],
              genderData[genderLabels[2]],
            ],
            backgroundColor: [
              "rgba(255, 99, 132, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(255, 206, 86, 0.2)",
            ],
            borderColor: [
              "rgba(255, 99, 132, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
            ],
            borderWidth: 1,
          },
        ],
      });

      setIsLoadingGenderData(false);
    };

    setDataForGenderPieChart();
  }, []);

  useEffect(() => {
    const setDataForCountryPieChart = async () => {
      setIsLoadingCountryData(true);
      const countryMapping: { [key: string]: string } = {
        KEN: "Kenya",
        UGN: "Uganda",
        NIG: "Nigeria",
        GHN: "Ghana",
        RSA: "South Africa", // Assuming "RSA" refers to "South Africa"
      };

      const countryData: { [key: string]: number } = {};

      countryData[countryMapping["KEN"]] = 0;
      countryData[countryMapping["UGN"]] = 0;
      countryData[countryMapping["NIG"]] = 0;
      countryData[countryMapping["GHN"]] = 0;
      countryData[countryMapping["RSA"]] = 0;

      const allParticipantsOfSurvey = await getParticipantsOfSurvey(address, {
        _surveyId: surveyId,
      });

      for (
        let participantId = 0;
        participantId < allParticipantsOfSurvey.length;
        participantId++
      ) {
        const participant = allParticipantsOfSurvey[participantId];

        const countryKey = countryMapping[participant.country];
        if (countryKey) {
          countryData[countryKey] += 1;
        }
      }
      setCountryData({
        labels: Object.keys(countryData),
        datasets: [
          {
            label: "# of Responses",
            data: Object.values(countryData),
            backgroundColor: [
              "rgba(255, 99, 132, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(255, 206, 86, 0.2)",
              "rgba(75, 192, 192, 0.2)",
              "rgba(255, 159, 64, 0.2)",
            ],
            borderColor: [
              "rgba(255, 99, 132, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(75, 192, 192, 1)",
              "rgba(255, 159, 64, 1)",
            ],
            borderWidth: 1,
          },
        ],
      });

      setIsLoadingCountryData(false);
    };

    setDataForCountryPieChart();
  }, []);

  useEffect(() => {
    const getAverageAgeOfParticipants = async () => {
      const currentYear = new Date().getFullYear();

      const calculatedAverageAge = allParticipantsOfSurvey.reduce(
        (acc, p) =>
          p.yearOfBirth
            ? acc +
              (currentYear - p.yearOfBirth) /
                allParticipantsOfSurvey.filter((p) => p.yearOfBirth).length
            : acc,
        0
      );

      setAverageAge(calculatedAverageAge);
    };

    getAverageAgeOfParticipants();
  }, [allParticipantsOfSurvey]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isConnected && address) {
      setUserAddress(address);
    }
  }, [address, isConnected]);

  if (!isMounted) {
    return (
      <div className="flex flex-col justify-center h-screen items-center mb-24">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="flex flex-col items-left py-2 mx-4 h-svh relative">
      <Text fontSize={"14"} onClick={() => router.back()}>
        Back
      </Text>

      <div className="flex flex-row justify-between w-full my-2 ">
        <div className="flex flex-row w-full ">
          <Text fontWeight={"normal"} fontSize={"24"}>
            Survey {surveyId}
          </Text>
          {/* <Square size="25px" color="white" ml={2} mt={1}>
            <Image my={4} src="/checkmark.png" alt="Home image" />
          </Square> */}
        </div>
      </div>

      <div className="flex flex-row justify-between w-full ">
        <Text fontWeight={"normal"} fontSize={"16"} mb={2}>
          Number of Participants So Far:
          <Button
            ml={4}
            loadingText="Participating and earning"
            borderRadius={"10"}
            width={"1/6"}
            bgColor={"#363062"}
            textColor={"white"}
            _hover={{
              bgColor: "#363062",
              textColor: "white",
            }}
          >
            {allParticipantsOfSurvey.length}
          </Button>
        </Text>
      </div>

      <Divider />

      <Text fontWeight={"bold"} fontSize={"20"} my={3}>
        Participant Distribution
      </Text>

      <Accordion allowMultiple>
        <AccordionItem>
          <h2>
            <AccordionButton>
              <Box as="span" flex="1" textAlign="left">
                Gender
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
            {isLoadingGenderData && (
              <div className="flex flex-col justify-center items-center">
                <Spinner />
              </div>
            )}

            <Pie
              data={genderData ?? pieChartDummyData}
              className={fonts.sen.className}
            />
          </AccordionPanel>
        </AccordionItem>

        <AccordionItem>
          <h2>
            <AccordionButton>
              <Box as="span" flex="1" textAlign="left">
                Country
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
            {isLoadingCountryData && (
              <div className="flex flex-col justify-center items-center">
                <Spinner />
              </div>
            )}

            <Pie
              data={countryData ?? pieChartDummyData}
              className={fonts.sen.className}
            />
          </AccordionPanel>
        </AccordionItem>

        <AccordionItem>
          <h2>
            <AccordionButton>
              <Box as="span" flex="1" textAlign="left">
                Age (Average)
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
            {isLoadingAgeData && (
              <div className="flex flex-col justify-center items-center">
                <Spinner />
              </div>
            )}

            <Button
              loadingText="Creating your participant account"
              borderRadius={"10"}
              width={"full"}
              bgColor={"#C0D6E8"}
              textColor={"black"}
              _hover={{
                bgColor: "#C0D6E8",
                textColor: "black",
              }}
            >
              {averageAge}{" "}
            </Button>
            {/* <Text color={"#F5E8C7"}>
              
            </Text> */}
          </AccordionPanel>
        </AccordionItem>
      </Accordion>

      <Text fontWeight={"bold"} fontSize={"20"} my={3}>
        Survey Feedback
      </Text>

      <Accordion allowMultiple>
        {allQuestionsOfSurvey.map((question) => (
          <AccordionItem key={question.id}>
            <h2>
              <AccordionButton>
                <Box as="span" flex="1" textAlign="left">
                  Question {allQuestionsOfSurvey.indexOf(question) + 1}
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              <Box as="span" flex="1" textAlign="left" fontStyle={"italic"}>
                {question.sentence}
              </Box>
              {isLoadingQuestionData && (
                <div className="flex flex-col justify-center items-center">
                  <Spinner />
                </div>
              )}
              <Box mt={"2"}>
                <Pie
                  data={
                    questionData[allQuestionsOfSurvey.indexOf(question)] ??
                    pieChartDummyData
                  }
                  className={fonts.sen.className}
                />
              </Box>
            </AccordionPanel>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
