import axios from 'axios'

export default class FirebaseService {
  _apiUrl = process.env.VUE_APP_URL

  async fetchData() {
    const res = await axios.get(`${this.url}/tasks.json`)
    return Object.keys(res.data).map(key => {
      return {
        ...res.data[key],
        id: key
      }
    })
  }
  async addTask(task) {
    const res = await axios.post(`${process.env.VUE_APP_URL}/tasks.json`, task)
    return res.data.name
  }
  async deleteTask(id) {
    const res = await axios.delete(`${process.env.VUE_APP_URL}/tasks.json`, id)
    return res.data.name
  }
}
