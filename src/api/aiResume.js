import api from './config.js';

export const aiResumeAPI = {
  // Generate resume with AI
  generateResumeWithAI: async (userInput) => {
    const response = await api.post('/ai-resume/generate', userInput);
    return response.data;
  },

  // Regenerate existing resume with AI
  regenerateResumeWithAI: async (id, userInput) => {
    const response = await api.put(`/ai-resume/${id}/regenerate`, userInput);
    return response.data;
  },

  // Get all AI-generated resumes
  getAIResumes: async () => {
    const response = await api.get('/ai-resume');
    return response.data;
  },

  // Get Gemini API usage
  getGeminiUsage: async () => {
    const response = await api.get('/ai-resume/usage');
    return response.data;
  },

  // Test Gemini API connection
  testGeminiConnection: async () => {
    const response = await api.get('/ai-resume/test');
    return response.data;
  },

  // Delete AI-generated resume
  deleteAIResume: async (id) => {
    const response = await api.delete(`/ai-resume/${id}`);
    return response.data;
  },

  // Get resume by ID
  getResumeById: async (id) => {
    const response = await api.get(`/ai-resume/${id}`);
    return response.data;
  },

  // Update resume
  updateResume: async (id, data) => {
    const response = await api.put(`/ai-resume/${id}`, data);
    return response.data;
  },

  // Edit resume (alias for updateResume)
  editResume: async (id, data) => {
    const response = await api.put(`/ai-resume/${id}`, data);
    return response.data;
  },
}; 