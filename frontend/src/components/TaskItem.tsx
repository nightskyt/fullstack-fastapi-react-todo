import { Box, ButtonGroup, Flex, IconButton, ListItem, Spacer, Text } from "@chakra-ui/react";
import { useState } from "react";
import { BiCheckCircle, BiXCircle } from "react-icons/bi"

export interface Task {
    id: number,
    title: string,
    description: string,
    completed: boolean
}

interface TaskItemProps {
    task: Task,
    onCompleted: () => void,
    onDeleted: () => void,
}

export default function TaskItem({ task, onCompleted, onDeleted }: TaskItemProps) {
    const [, setIsHovered] = useState(false);


    return (
        <ListItem
            bg='white'
            style={{ borderRadius: "5px" }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            _hover={{ bg: "blue.100", cursor: "pointer" }}
        >
            <Flex>
                <Box p='2'>
                    <Text as={task.completed ? "s" : "b"}>
                        {task.title}
                    </Text>
                </Box>
                <Spacer />
                <ButtonGroup>
                    <IconButton
                        aria-label="Mark as completed"
                        onClick={onCompleted}
                        icon={< BiCheckCircle fontSize='25px' />}
                    />
                    <IconButton
                        aria-label="Delete task"
                        onClick={onDeleted}
                        icon={<BiXCircle fontSize='25px' />}
                    />
                </ButtonGroup>
            </Flex>
        </ListItem>
    )
}