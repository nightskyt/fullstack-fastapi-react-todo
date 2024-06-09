import {
    Button,
    Collapse,
    List,
    Stack,
    useDisclosure,
} from '@chakra-ui/react'


import TaskItem, { Task } from '../components/TaskItem'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { getTasks, deleteTask, updateTask } from '../api/task'
import { ChevronDownIcon, ChevronRightIcon } from '@chakra-ui/icons'

export default function TaskList() {
    const queryClient = useQueryClient()
    const { isOpen, onToggle } = useDisclosure()

    const { data, isPending, isError, error } = useQuery({
        queryKey: ['getTasks'],
        queryFn: getTasks,
    })

    const updateTaskMutation = useMutation({
        mutationKey: ['updateTask'],
        mutationFn: ({ id, task }: any) => {
            return updateTask(id, task)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['getTasks'] })
        }
    })

    const deleteTaskMutation = useMutation({
        mutationKey: ['deleteTask'],
        mutationFn: deleteTask,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['getTasks'] })
        }
    })

    if (isPending) return <p>Loading...</p>
    if (isError) return <p>{error.message}</p>

    const uncompletedTasks = data.filter((task: Task) => !task.completed)
    const completedTasks = data.filter((task: Task) => task.completed)

    return (
        <>
            <List className='uncomplete'>
                <Stack spacing={3}>
                    {uncompletedTasks.map((task: Task) => (
                        <TaskItem
                            key={task.id}
                            task={task}
                            onCompleted={() => {
                                updateTaskMutation.mutate({
                                    id: task.id,
                                    task: {
                                        ...task,
                                        completed: !task.completed,
                                    }
                                })
                            }}
                            onDeleted={() => {
                                deleteTaskMutation.mutate(task.id)
                            }}
                        />
                    ))}
                </Stack>
            </List>
            <br />
            {completedTasks.length > 0 && (
                <>
                    <Button
                        onClick={onToggle}
                        leftIcon={isOpen ? <ChevronDownIcon /> : <ChevronRightIcon />}
                    >
                        已完成 {completedTasks.length}
                    </Button>
                    <Collapse in={isOpen} animateOpacity>
                        <br />
                        <List className='complete'>
                            <Stack spacing={3}>
                                {completedTasks.map((task: Task) => (
                                    <TaskItem
                                        key={task.id}
                                        task={task}
                                        onCompleted={() => {
                                            updateTaskMutation.mutate({
                                                id: task.id,
                                                task: {
                                                    ...task,
                                                    completed: !task.completed,
                                                }
                                            })
                                        }}
                                        onDeleted={() => {
                                            deleteTaskMutation.mutate(task.id)
                                        }}
                                    />
                                ))}
                            </Stack>
                        </List>
                    </Collapse>
                </>
            )}

        </>
    )
}
