import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import './style.css'

const TuneList = () => {
  const [tunes, setTunes] = useState(
    [
      { id: 1, artist: 'Jay Z', title: 'Young Forever' },
      { id: 2, artist: 'Alphaville', title: 'Forever Young' }
    ]
  );

  const addTune = (title, artist) => {
    let tune = {
      id: tunes.length + 1,
      artist,
      title
    };
    setTunes(tunes.concat([tune]));
  }

  const removeTune = (id) => {
    if (confirm("Are you sure you want to remove this?")) {
      setTunes(tunes.filter(tune => {
        return tune.id != id;
      }));
    }
  }

  return (
    <div>
    There are a total of {tunes.length} tune{tunes.length != 1 ? 's' : ''}.
    <table className="table">
      <thead>
        <tr><th>Tune</th><th>Artist</th><th></th></tr>
      </thead>
      <tbody>
      {
        tunes.map(tune => {
          return (
            <Tune key={tune.id} id={tune.id} title={tune.title} artist={tune.artist} handleRemove={removeTune}/>
          )
        })
      }
      </tbody>
    </table>
    <h2>Add Tune</h2>
    <AddTuneForm onSubmit={addTune} />
    </div>
  )
}

const RemoveButton = ({id, handleRemove}) => {
  const handleClick = () => {
    handleRemove(id);
  }

  return (
    <button onClick={handleClick} id={0}>Remove</button>
  )
}

const Tune = ({id, title, artist, handleRemove}) => {
  return (
    <tr>
      <td>{title}</td>
      <td>{artist}</td>
      <td><RemoveButton id={id} handleRemove={handleRemove} /></td>
    </tr>
  )
}

const AddTuneForm = ({onSubmit}) => {
  const handleSubmit = (event) => {
    event.preventDefault()
    let text = event.target.text.value;
    let titleArtistPair = text.split(' by ');
    onSubmit(titleArtistPair[0], titleArtistPair[1])
  }

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="Song by Artist" name="text" />
      <input type="submit" value="Add" />
    </form>
  )
}

const App = () => {
  return (  
    <TuneList/> 
  )
}

ReactDOM.render(<App/>, document.getElementById('app-root'));
