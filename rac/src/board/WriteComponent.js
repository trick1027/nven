import Editor from '../components/EditorComponent';

const WriteComponent = () => {
  const [desc, setDesc] = useState('');
  function onEditorChange(value) {
    setDesc(value)
  }

  return (
    <div>
      <Editor value={desc} onChange={onEditorChange} />
    </div>
  )
};

export default WriteComponent;