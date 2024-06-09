import { createFileRoute } from '@tanstack/react-router'
import { Grid, GridItem, Heading, Text } from '@chakra-ui/react'
import TaskList from '../components/TaskList'
import AddTask from '../components/AddTask'

export const Route = createFileRoute('/')({
  component: Index,
})

function Index() {
  const currentDate = new Date()
  const year = currentDate.getFullYear()
  const month = currentDate.getMonth() + 1
  const day = currentDate.getDate()
  const weekNumber = currentDate.getDay()
  let week = ''
  switch (weekNumber) {
    case 0:
      week = '日'
      break
    case 1:
      week = '一'
      break
    case 2:
      week = '二'
      break
    case 3:
      week = '三'
      break
    case 4:
      week = '四'
      break
    case 5:
      week = '五'
      break
    case 6:
      week = '六'
      break
  }

  return (
    <>
      <Grid
        h='200px'
        templateRows='repeat(3, 1fr)'
        templateColumns='repeat(1, 1fr)'
        gap={4}
      >
        <GridItem rowSpan={1} colSpan={1}>
          <Heading color='white'>我的一天</Heading>
          <Text color='white'>{year}年{month}月{day}日, 星期{week}</Text>
        </GridItem>
        <GridItem rowSpan={2} h="80vh">
          <TaskList />
        </GridItem>
        <GridItem rowSpan={3}>
          <AddTask />
        </GridItem>
      </Grid>
    </>
  )
}