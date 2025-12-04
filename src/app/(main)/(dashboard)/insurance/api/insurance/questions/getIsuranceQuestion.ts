import { useQuery } from 'react-query'

export const useFetchInsuranceQuestions = (type: string) => {
  return useQuery(
    ['insurance-questions', type],
    async () => {
      // Mock data for testing
      return {
        data: [
          {
            id: 1,
            question_text: "Do you have any heart conditions?",
            question_type: "multiple_choice",
            options: ["Yes", "No"],
            is_required: true
          },
          {
            id: 2,
            question_text: "Select any medical conditions you have:",
            question_type: "checkbox", 
            options: ["Heart problems", "High blood pressure", "Diabetes", "Asthma", "Epilepsy", "Pregnancy"],
            is_required: false
          },
          {
            id: 3,
            question_text: "List current medications:",
            question_type: "textarea",
            placeholder: "List any medications you are currently taking...",
            is_required: false
          },
          {
            id: 4,
            question_text: "Last physical exam date:",
            question_type: "date",
            is_required: false
          }
        ]
      }
    },
    {
      enabled: !!type
    }
  )
}