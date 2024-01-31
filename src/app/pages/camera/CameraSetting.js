import React from 'react'
import PropTypes from 'prop-types'
import AppBar from '@material-ui/core/AppBar'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import {makeStyles} from '@material-ui/core/styles'
import MenuItem from '@material-ui/core/MenuItem'
import Checkbox from '@material-ui/core/Checkbox'
import FormLabel from '@material-ui/core/FormLabel'
import FormControl from '@material-ui/core/FormControl'
import FormGroup from '@material-ui/core/FormGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormHelperText from '@material-ui/core/FormHelperText'
const currencies = [
  {
    value: 'Select-Mode-1',
    label: 'Select-Mode-1',
  },
  {
    value: 'Select-Mode-2',
    label: 'Select-Mode-2',
  },
  {
    value: 'Select-Mode-3',
    label: 'Select-Mode-3',
  },
  {
    value: 'Select-Mode-4',
    label: 'Select-Mode-4',
  },
]

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  dense: {
    marginTop: theme.spacing(2),
  },
}))

function TabContainer(props) {
  return (
    <Typography component='div' style={{padding: 8 * 3}}>
      {props.children}
    </Typography>
  )
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
}

export function AddCameraSetting() {
  const [value, setValue] = React.useState(0)

  function handleChange(event, newValue) {
    setValue(newValue)
  }
  return (
    <div className='add-site-popup'>
      <AppBar position='static' color='default' className='header01'>
        <div className='title'>Camera Settings</div>
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor='primary'
          textColor='primary'
          variant='scrollable'
          scrollButtons='auto'
        >
          <Tab label={<Details />} />
          <Tab label={<Details2 />} />
        </Tabs>
      </AppBar>
      <div className='add-tap-content'>
        {value === 0 && (
          <TabContainer>
            <CameraDetails />
          </TabContainer>
        )}
        {value === 1 && (
          <TabContainer>
            <CameraNetwork />
          </TabContainer>
        )}
      </div>
    </div>
  )
}

export function Details() {
  return (
    <div className='tab-first-nav'>
      <div className='count'>1</div>
      <div className='details-content'>
        <div className='nav-sub-title'>Details</div>
        <div className='nav-summary'>Camera name and Model</div>
      </div>
    </div>
  )
}

export function Details2() {
  return (
    <div className='tab-first-nav'>
      <div className='count'>2</div>
      <div className='details-content'>
        <div className='nav-sub-title'>Network</div>
        <div className='nav-summary'>Includes the Host and Port</div>
      </div>
    </div>
  )
}

export function CameraDetails(props) {
  const classes = useStyles()
  const [values, setValues] = React.useState({
    multiline: 'Controlled',
  })
  const handleChange = (name) => (event) => {
    setValues({...values, [name]: event.target.value})
  }
  return (
    <div className='device-model'>
      <div className='icons'>
        <img src='./media/vms/bx_message-square-detail.svg' alt='icon' className='icons' />{' '}
        <span className='sub-title'> Details </span>
      </div>
      <div className='summary-content'> Here you can fill the camera name and Model</div>

      <div className='device-input-details'>
        <form noValidate autoComplete='off'>
          <TextField
            id='outlined-name'
            label='Device name'
            className='input-name'
            onChange={handleChange('name')}
            variant='outlined'
          />

          <TextField
            id='outlined-select-currency'
            select
            label='Select-Mode'
            className='input-name mt-5'
            value={values.currency}
            onChange={handleChange('currency')}
            SelectProps={{
              MenuProps: {
                className: classes.menu,
              },
            }}
            variant='outlined'
          >
            {currencies.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </form>
      </div>
      <div className='model-confirmation'>
        <Button variant='contained' className='btn cancel'>
          Next
        </Button>
        <Button variant='contained' className='btn add'>
          Cancel
        </Button>
      </div>
    </div>
  )
}

export function CameraNetwork() {
  const classes = useStyles()
  const [values, setValues] = React.useState({
    multiline: 'Controlled',
  })
  const handleChange = (name) => (event) => {
    setValues({...values, [name]: event.target.value})
  }
  return (
    <div className=''>
      <div className='device-model'>
        <div className='icons'>
          <img src='./media/vms/network.svg' alt='icon' className='icons' />{' '}
          <span className='sub-title'> Network </span>
        </div>
        <div className='summary-content mb-3'> Here you can includes the Host and Port</div>

        <div className='row'>
          <div className='col-md-6'>
            <div className='mb-3'>
              <form noValidate autoComplete='off'>
                <TextField
                  id='outlined-name'
                  label='Host'
                  className='input-name'
                  onChange={handleChange('name')}
                  variant='outlined'
                />

                <TextField
                  id='outlined-name'
                  label='Port'
                  className='input-name mt-5'
                  onChange={handleChange('name')}
                  variant='outlined'
                />
              </form>
            </div>
          </div>
          <div className='col-md-6'>
            <div className='mb-3'>
              <form noValidate autoComplete='off'>
                <TextField
                  id='outlined-name'
                  label='User name'
                  className='input-name'
                  onChange={handleChange('name')}
                  variant='outlined'
                />

                <TextField
                  id='outlined-name'
                  label='Password'
                  type='password'
                  className='input-name mt-5'
                  onChange={handleChange('name')}
                  variant='outlined'
                />
              </form>
            </div>
          </div>
        </div>

        <div className='device-connection-details mb-8'>
          <div className='mb-3'>
            < CheckboxesGroup />
          </div>
          <div className='d-flex align-items-center justify-content-start gap-5'>
          <Button variant='contained' className='btn add' aria-label="Small" size="small">
          Open device in browser
          </Button>
          <Button variant='contained' className='btn add' aria-label="Small" size="small">
          Ping device
          </Button>
        </div>
        </div>

        <div className='model-confirmation'>
          <Button variant='contained' className='btn cancel'>
            Next
          </Button>
          <Button variant='contained' className='btn add'>
            Cancel
          </Button>
        </div>
      </div>
    </div>
  )
}

export function CheckboxesGroup() {
  const [state, setState] = React.useState({
    gilad: true,
  })

  const handleChange = (name) => (event) => {
    setState({...state, [name]: event.target.checked})
  }

  const {gilad} = state
  const error = [gilad].filter((v) => v).length !== 2

  return (
    <div>
      <FormControl component='fieldset'>    
        <FormGroup>
          <FormControlLabel
            control={<Checkbox  color="primary" checked={gilad} onChange={handleChange('gilad')} value='gilad' />}
            label='Secure connection'
          />
        </FormGroup>
      </FormControl>
    </div>
  )
}
