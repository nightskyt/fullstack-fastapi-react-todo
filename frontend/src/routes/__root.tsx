import { Grid, GridItem, List, ListIcon, ListItem, Stack } from '@chakra-ui/react'
import { createRootRoute, Link, Outlet } from '@tanstack/react-router'
import { FiSun, FiStar, FiList, FiHome } from "react-icons/fi"

export const Route = createRootRoute({
  component: () => (
    <>
      <Grid
        templateAreas={`"nav main"
                        "nav search"`}
        gridTemplateRows={'100vh 1fr 30px'}
        gridTemplateColumns={'150px 1fr'}
        h='200px'
        gap='1'
        color='blackAlpha.700'
        fontWeight='bold'
      >
        <GridItem pl='2' bg='white.300' area={'nav'}>

          <List>
            <Stack spacing={5}>
              <ListItem>
                <ListIcon as={FiSun} />
                <Link to="/">
                  我的一天
                </Link>
              </ListItem>
              <ListItem>
                <ListIcon as={FiStar} color='red.300' />
                <Link to="/important">
                  重要
                </Link>
              </ListItem>
              <ListItem>
                <ListIcon as={FiList} />
                <Link to="/plan">
                  计划内
                </Link>
              </ListItem>
              <ListItem>
                <ListIcon as={FiHome} />
                <Link to="/task">
                  任务
                </Link>
              </ListItem>
            </Stack>

          </List>
        </GridItem>
        <GridItem pl='2' bg='green.300' area={'main'}>
          <Outlet />
        </GridItem>
      </Grid>
    </>
  ),
})
