import { useState, useMemo, FC, useContext } from 'react'

import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'

import { Grid, Card, CardHeader, CardContent, TextField, CardActions, Button, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, capitalize, IconButton } from '@mui/material'
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'

import { dbEntries } from '../../database' 
import { EntriesContext } from '../../context/entries'
import { UIContext } from '../../context/ui'
import { EntriesStatus, Entry } from '../../interfaces'
import { Layout } from "../../components/layouts"
import { RecycleDialog } from '../../components/ui'
import { dateFunctions } from '../../utils'

const validStatus: EntriesStatus[] = ['pending', 'in-progress', 'finished']

interface Props {
  entry: Entry
}


const Entry: FC<Props> = ({ entry }) => {
  const [inputValue, setInputValue] = useState(entry.description)
  const [status, setStatus] = useState<EntriesStatus>(entry.status)
  const [touched, setTouched] = useState(false)

  const { push } = useRouter()

  const { updateEntry, removeEntry } = useContext( EntriesContext )
  const { openDialog } = useContext( UIContext )

  const isNotValid = useMemo(() => touched && inputValue.length <= 0, [inputValue, touched])

  const onTextFiledChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
  }

  const onStatusChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStatus(e.target.value as EntriesStatus)
  }

  const onSave = () => {

    if (inputValue.trim().length <= 0) return

    const updatedEntry = {
      ...entry,
      description: inputValue,
      status
    }

    updateEntry( updatedEntry, true )
    // push('/')
  }

  const onDelete = () => {
    removeEntry(entry._id)
    push('/')
  }


  return (
    <Layout title={ inputValue.substring(0, 20) + '...' }>
      <Grid
        container
        justifyContent="center"
        sx={{
          marginTop: 2,
          padding: 2
        }}
      >
        <Grid item xs={ 12 } sm={ 8 } md={ 6 }>
          <Card>
            <CardHeader 
              title='Edit Entry'
              subheader={ dateFunctions.getFormatDistanceToNow(entry.createdAt) }
            />
            <CardContent>
              <TextField 
                sx={{
                  marginTop: 2,
                  marginBottom: 1
                }}
                fullWidth
                placeholder='Description'
                autoFocus
                multiline
                label='New entry'
                onChange={ onTextFiledChange }
                value={ inputValue }
                helperText={ isNotValid && 'Description is required' }
                error={ isNotValid }
                onBlur={ () => setTouched(true) }
              />
              <FormControl>
                <FormLabel>
                  Status
                </FormLabel>
                <RadioGroup
                  row
                  onChange={ onStatusChange }
                  value={ status }
                >
                  {
                    validStatus.map((status) => (
                      <FormControlLabel
                        key={ status }
                        value={ status }
                        control={<Radio />}
                        label={ capitalize(status) }
                      />
                    ))
                  }
                </RadioGroup>
              </FormControl>
            </CardContent>
            <CardActions>
              <Button
                startIcon={<SaveOutlinedIcon />}
                variant="contained"
                color="secondary"
                fullWidth
                disabled={ inputValue.length <= 0 }
                onClick={ onSave }
              >
                Save
              </Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>

      <IconButton sx={{
          position: 'fixed',
          bottom: 20,
          right: 20,
          backgroundColor: 'error.main',
        }}
        onClick={ () => openDialog() }
      >
        <DeleteOutlineIcon />
      </IconButton>
      <RecycleDialog onClose={ onDelete } />
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {

  const { id } = params as { id: string }

  const entry = await dbEntries.getEntryById( id )

  if( !entry ) return {
    redirect: {
      destination: '/',
      permanent: false
    }
  }

  return {
    props: {
      entry
    }
  }
}

export default Entry