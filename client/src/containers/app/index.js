import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Drawer from '@material-ui/core/Drawer'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import List from '@material-ui/core/List'
import CssBaseline from '@material-ui/core/CssBaseline'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import { Icon } from 'semantic-ui-react'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import IconButton from '@material-ui/core/IconButton'
import { Route, Link } from 'react-router-dom'

import Home from '../home'
import AdminPage from '../adminPage'
import HelpPage from '../helpPage'
import PatientPage from '../patientPage'
import PatientSummaryContainer from '../patientPage/patientSummaryContainer'
import StatisticsPage from '../statisticsPage'
import ReferralsPage from '../referralsPage'
import NewReadingPage from '../newReadingPage'
import Signup from '../signup'
import Login from '../login'
import VideoLanding from '../videoChatLandingPage'
import Session from '../videoSessionPage'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { logoutUser } from '../../actions/users'

import AppImg from './img/app_icon.png'
import PatientsImg from './img/patients.svg'
import ReferralsImg from './img/referrals.svg'
import StatisticsImg from './img/statistics.svg'
import CreateImg from './img/create.svg'
import VideoImg from './img/video-solid.svg'
import EduImg from './img/graduation-cap-solid.svg'

const drawerWidth = 200

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex'
    },
    appBar: {
        backgroundColor: '#15152B',
        zIndex: theme.zIndex.drawer + 1
    },
    toolbarButtons: {
        marginLeft: 'auto',
        marginRight: -12
    },
    toolbarButtonsPadded: {
        marginLeft: 'auto',
        paddingLeft: 30,
        paddingRight: 30
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0
    },
    drawerPaper: {
        /* Permalink - use to edit and share this gradient: https://colorzilla.com/gradient-editor/#3b679e+0,34787e+0,45889f+51,65a6df+100 */
        background: '#3b679e' /* Old browsers */,
        background:
            '-moz-linear-gradient(top,  #3b679e 0%, #34787e 0%, #45889f 51%, #65a6df 100%)' /* FF3.6-15 */,
        background:
            '-webkit-linear-gradient(top,  #3b679e 0%,#34787e 0%,#45889f 51%,#65a6df 100%)' /* Chrome10-25,Safari5.1-6 */,
        background:
            'linear-gradient(to bottom,  #3b679e 0%,#34787e 0%,#45889f 51%,#65a6df 100%)' /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */,
        filter:
            "progid:DXImageTransform.Microsoft.gradient( startColorstr='#3b679e', endColorstr='#65a6df',GradientType=0 )" /* IE6-9 */,

        width: drawerWidth
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3)
    },
    toolbar: theme.mixins.toolbar,
    listItem: { flexDirection: 'column', margin: '10px 0px 10px 0px' },
    logout: { marginTop: '20px', bottom: 0 },
    itemText: { color: 'white', paddingTop: '8px' }
}))

const App = props => {
    const classes = useStyles()
    const [activeItem, setActiveItem] = useState('Patients')

    const getRole = roles => {
        if (roles.includes('ADMIN')) {
            return 'ADMIN'
        } else if (roles.includes('HCW')) {
            return 'Healthcare Worker'
        } else if (roles.includes('CHO')) {
            return 'CHO'
        } else if (roles.includes('VHT')) {
            return 'VHT'
        }
        return ''
    }

    const titleTextStyle = {
        fontFamily: 'Open Sans',
        fontWeight: 'bold',
        fontSize: 36
    }

    const sidebarTextStyle = {
        fontFamily: 'Open Sans',
        fontWeight: 300,
        fontSize: 18
    }

    const offsetFromTop = 50

    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar position="fixed" className={classes.appBar}>
                <Toolbar>
                    <img src={AppImg} className="appIcon" />
                    <Typography noWrap style={titleTextStyle}>
                        CRADLE
                    </Typography>
                    {props.user.isLoggedIn && (
                        <div style={{ marginLeft: 'auto', marginRight: 0 }}>
                            <IconButton
                                className={classes.toolbarButtons}
                                onClick={() => ''}
                                color="inherit">
                                <Icon name="user circle" size="large" />
                                <div>
                                    <Typography variant="body1" noWrap>
                                        {props.user.firstName} (
                                        {getRole(props.user.roles)})
                                    </Typography>
                                    {props.user.healthFacilityName && (
                                        <Typography variant="body2" noWrap>
                                            Healthcare Facility:{' '}
                                            {props.user.healthFacilityName}
                                        </Typography>
                                    )}
                                </div>
                            </IconButton>

                            <IconButton
                                className={classes.toolbarButtonsPadded}
                                button
                                component={Link}
                                to="/help"
                                onClick={() => setActiveItem('Help')}
                                selected={activeItem === 'Help'}
                                color="inherit">
                                <Icon name="help" size="small" />
                            </IconButton>
                        </div>
                    )}
                </Toolbar>
            </AppBar>

            {props.user.isLoggedIn ? (
                <Drawer
                    className={classes.drawer}
                    variant="permanent"
                    classes={{
                        paper: classes.drawerPaper
                    }}
                    anchor="left">
                    <div
                        className={classes.toolbar}
                        style={{ marginTop: offsetFromTop }}
                    />
                    <List>
                        <ListItem
                            className={classes.listItem}
                            button
                            component={Link}
                            to="/newreading"
                            selected={activeItem === 'Reading'}
                            onClick={() => setActiveItem('Reading')}>
                            <ListItemIcon>
                                <img
                                    src={CreateImg}
                                    class="center sidebarIcon"
                                />
                            </ListItemIcon>
                            <ListItemText
                                disableTypography
                                className={classes.itemText}
                                primary={
                                    <Typography style={sidebarTextStyle}>
                                        Patient &amp; Reading
                                    </Typography>
                                }
                            />
                        </ListItem>
                        <ListItem
                            className={classes.listItem}
                            button
                            component={Link}
                            to="/patients"
                            selected={activeItem === 'Patients'}
                            onClick={() => setActiveItem('Patients')}>
                            <ListItemIcon>
                                <img
                                    src={PatientsImg}
                                    class="center sidebarIcon"
                                />
                            </ListItemIcon>
                            <ListItemText
                                disableTypography
                                className={classes.itemText}
                                primary={
                                    <Typography style={sidebarTextStyle}>
                                        Patients
                                    </Typography>
                                }
                            />
                        </ListItem>
                        <ListItem
                            className={classes.listItem}
                            button
                            component={Link}
                            to="/referrals"
                            selected={activeItem === 'Referrals'}
                            onClick={() => setActiveItem('Referrals')}>
                            <ListItemIcon>
                                <img
                                    src={ReferralsImg}
                                    class="center sidebarIcon"
                                />
                            </ListItemIcon>
                            <ListItemText
                                disableTypography
                                className={classes.itemText}
                                primary={
                                    <Typography style={sidebarTextStyle}>
                                        Referrals
                                    </Typography>
                                }
                            />
                        </ListItem>
                        <ListItem
                            className={classes.listItem}
                            button
                            component={Link}
                            to="/stats"
                            selected={activeItem === 'Statistics'}
                            onClick={() => setActiveItem('Statistics')}>
                            <ListItemIcon>
                                <img
                                    src={StatisticsImg}
                                    class="center sidebarIcon"
                                />
                            </ListItemIcon>
                            <ListItemText
                                disableTypography
                                className={classes.itemText}
                                primary={
                                    <Typography style={sidebarTextStyle}>
                                        Statistics
                                    </Typography>
                                }
                            />
                        </ListItem>
                        <ListItem
                            className={classes.listItem}
                            button
                            component={Link}
                            to="/chat/landing"
                            selected={activeItem === 'Chat'}
                            onClick={() => setActiveItem('Chat')}>
                            <ListItemIcon>
                                <img
                                    src={VideoImg}
                                    class="center sidebarIcon"
                                />

                                {/* <i className="fas fa-video"></i> */}
                            </ListItemIcon>

                            <ListItemText
                                disableTypography
                                className={classes.itemText}
                                primary={
                                    <Typography style={sidebarTextStyle}>
                                        Live Video Chat
                                    </Typography>
                                }
                            />
                        </ListItem>
                        <ListItem
                            className={classes.listItem}
                            button
                            component={Link}
                            to="/resources"
                            selected={activeItem === 'Resources'}
                            onClick={() => setActiveItem('Resources')}>
                            <ListItemIcon>
                                <img src={EduImg} class="center sidebarIcon" />

                                {/* <i className="fas fa-video"></i> */}
                            </ListItemIcon>

                            <ListItemText
                                disableTypography
                                className={classes.itemText}
                                primary={
                                    <Typography style={sidebarTextStyle}>
                                        Resources
                                    </Typography>
                                }
                            />
                        </ListItem>

                        <Divider />

                        {props.user.roles.includes('ADMIN') && (
                            <div>
                                <ListItem
                                    className={[classes.listItem]}
                                    component={Link}
                                    button
                                    key="new user"
                                    to="/signup"
                                    selected={activeItem === 'Signup'}
                                    onClick={() => setActiveItem('Signup')}>
                                    <ListItemText
                                        disableTypography
                                        className={classes.itemText}
                                        primary={
                                            <Typography
                                                style={sidebarTextStyle}>
                                                Create New User
                                            </Typography>
                                        }
                                    />
                                </ListItem>
                                <ListItem
                                    className={classes.listItem}
                                    component={Link}
                                    button
                                    key="new user"
                                    to="/admin"
                                    selected={activeItem === 'Admin'}
                                    onClick={() => setActiveItem('Admin')}>
                                    <ListItemText
                                        disableTypography
                                        className={classes.itemText}
                                        primary={
                                            <Typography
                                                style={sidebarTextStyle}>
                                                Admin Panel
                                            </Typography>
                                        }
                                    />
                                </ListItem>

                                <Divider />
                            </div>
                        )}

                        <ListItem
                            className={[classes.listItem, classes.logout]}
                            button
                            key="Logout"
                            onClick={() => props.logoutUser()}>
                            <ListItemText
                                disableTypography
                                className={classes.itemText}
                                primary={
                                    <Typography style={sidebarTextStyle}>
                                        Logout
                                    </Typography>
                                }
                            />
                        </ListItem>
                    </List>
                </Drawer>
            ) : null}

            <main
                className={classes.content}
                style={{ paddingTop: offsetFromTop }}>
                <div className={classes.toolbar} />
                <Route exact path="/" component={Home} />
                <Route exact path="/admin" component={AdminPage} />
                <Route exact path="/help" component={HelpPage} />
                <Route exact path="/patients" component={PatientPage} />
                <Route
                    path="/patient/:id"
                    component={PatientSummaryContainer}
                />
                <Route exact path="/signup" component={Signup} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/stats" component={StatisticsPage} />
                <Route exact path="/referrals" component={ReferralsPage} />
                <Route exact path="/newreading" component={NewReadingPage} />
                <Route exact path="/resources" component={HelpPage} />
                <Route exact path="/chat/landing" component={VideoLanding} />
                <Route exact path="/chat/session" component={Session} />
                <Route exact path="/chat/session/:roomId" component={Session} />
            </main>
        </div>
    )
}

const mapStateToProps = ({ user }) => ({
    user: user.currentUser
})

const mapDispatchToProps = dispatch =>
    bindActionCreators(
        {
            logoutUser
        },
        dispatch
    )

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App)
