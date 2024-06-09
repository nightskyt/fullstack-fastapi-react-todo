import axios from 'axios'

const API_URL = 'http://localhost:8000/api/todos'

export async function getTasks() {
    try {
        const resp = await axios.get(API_URL)
        return resp.data
    } catch (error) {
        console.error(error)
    }
}

export async function createTask(task: any) {
    try {
        const resp = await axios.post(API_URL, task)
        return resp.data
    } catch (error) {
        console.error(error)
    }
}

export async function updateTask(id: number, task: any) {
    try {
        const resp = await axios.put(`${API_URL}/${id}`, task)
        return resp.data
    } catch (error) {
        console.error(error)
    }
}

export async function deleteTask(id: number) {
    try {
        const resp = await axios.delete(`${API_URL}/${id}`)
        return resp.data
    } catch (error) {
        console.error(error)
    }
}