import axios from 'axios'

export default class FirebaseService {
  _apiUrl = process.env.VUE_APP_URL

  async fetchData() {
    const res = await axios.get(`${this._apiUrl}/tasks.json`)
    if (!res.data) return false
    return Object.keys(res.data).map(key => {
      return {
        ...res.data[key],
        id: key
      }
    })
  }
  async addTask(task) {
    const res = await axios.post(`${this._apiUrl}/tasks.json`, task)
    return res.data.name
  }
  async deleteTask(id) {
    const res = await axios.delete(`${this._apiUrl}/tasks/${id}.json`)
    return res.status === 200 ? true : false
  }
  async updateTask(task) {
    const res = await axios.put(`${this._apiUrl}/tasks/${task.id}.json`, task)
    return res.status === 200 ? true : false
  }
}
