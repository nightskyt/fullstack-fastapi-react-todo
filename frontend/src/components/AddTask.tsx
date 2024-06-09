import { Button, Flex, IconButton, Input, InputGroup, InputLeftElement, InputRightElement, List, ListItem, SlideFade, Stack, useDisclosure } from "@chakra-ui/react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { forwardRef, useState } from "react"
import { BiCalendar, BiHomeAlt, BiPlus } from "react-icons/bi"
import { createTask } from "../api/task"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css";


const TaskListFade = () => {
    return (
        <List
            w='250px' // 设置宽度为200px
            color='white'
            minW='auto' // 覆盖minW以确保宽度为200px
            bg='blueviolet'
        >
            <Stack spacing={2}>
                <ListItem>1</ListItem>
                <ListItem>2</ListItem>
                <ListItem>3</ListItem>
            </Stack>
        </List>
    )
}

const DatePickerFade = () => {
    const [startDate, setStartDate] = useState(new Date())
    const ExampleCustomInput = forwardRef(({ onClick }, ref) => (
        <ListItem className="example-custom-input" onClick={onClick} ref={ref}>
            选择日期
        </ListItem>
    ))

    return (
        <List
            w='250px' // 设置宽度为200px
            color='white'
            minW='auto' // 覆盖minW以确保宽度为200px
            bg='blueviolet'
        >
            <Stack spacing={2}>
                <ListItem>今天</ListItem>
                <ListItem>明天</ListItem>
                <ListItem>下周</ListItem>
                <DatePicker
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                    customInput={<ExampleCustomInput />}
                />
            </Stack>
        </List>
    )

}

function SlideFadeContext({ buttonID }) {
    switch (buttonID) {
        case 1:
            return <TaskListFade />
        case 2:
            return <DatePickerFade />
    }
}


export default function AddTask() {
    const [title, setTitle] = useState('')
    const [buttonID, setButtonID] = useState(0)
    const { isOpen, onToggle } = useDisclosure()

    const queryClient = useQueryClient()
    const createTaskMutation = useMutation({
        mutationKey: ['createTask'],
        mutationFn: createTask,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['getTasks'] })
        }
    })

    const handleOnClick = () => {

        if (title.trim() === '') {
            alert('任务不能为空')
            return
        }

        createTaskMutation.mutate({
            title: title,
            description: '',
        })
        setTitle('')
    }

    return (
        <>
            <SlideFade in={isOpen} offsetY='20'>
                <Flex justifyContent='flex-end'>
                    <SlideFadeContext buttonID={buttonID} />
                </Flex>
            </SlideFade>

            <InputGroup>
                <InputLeftElement
                    pointerEvents='auto'>
                    <BiPlus
                        color='gray'
                        onClick={handleOnClick}
                    />
                </InputLeftElement>

                <Input
                    bg='white'
                    placeholder='添加任务'
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />

                <InputRightElement width='10rem'>
                    {title.length > 0 && (
                        <>
                            <Button
                                colorScheme='white'
                                color='gray'
                                leftIcon={<BiHomeAlt />}
                                onClick={() => {
                                    setButtonID(1)
                                    onToggle()
                                }}
                            >
                                任务
                            </Button>

                            <IconButton
                                colorScheme='white'
                                color='gray'
                                variant='solid'
                                aria-label='Calendar'
                                icon={<BiCalendar />}
                                onClick={() => {
                                    setButtonID(2)
                                    onToggle()
                                }}
                            />
                        </>
                    )}
                </InputRightElement>
            </InputGroup>
        </>
    )
}
