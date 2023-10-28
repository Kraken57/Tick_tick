import { useState } from 'react';

import {Container, Stack, TextField, Button, Typography , Paper, Grid} from '@mui/material';
import LogoImg from '../../assets/logo2.svg';
import ImageEl from '../../components/utils/ImageEl';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../../firebase';
import useStore from '../../store';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';//imported both the icon 

const initForm = {
    email: "",
    password: "",
  };
  const AuthScreen = () => {
    const [visible, setvisible] = useState(false);
    const [loading, setLoading] = useState(false);
    const [isLogin, setIsLogin] = useState(true);
    const [form, setForm] = useState(initForm);
    const { setToastr } = useStore();
  
  
    const authText = isLogin
      ? "Do not have an account?"
      : "Already have an account?";
  
    const handleChange = (event) =>
      setForm((oldForm) => ({
        ...oldForm,
        [event.target.name]: event.target.value,
      }));
  
    const handleAuth = async () => {
      try {
        setLoading(true);
        if (isLogin) {
          await signInWithEmailAndPassword(auth, form.email, form.password);
        } else {
          await createUserWithEmailAndPassword(auth, form.email, form.password);
        }
      } catch (err) {
        const msg = err.code.split("auth/")[1].split("-").join(" ");
        setToastr(msg);
        setLoading(false);
      }
    };
     // here i have added this visible and setvisible for eye button 
     const EndAdornment = ({visible,setvisible}) => {
      return (<inputAdorment position ="end">
        <iconbutton onClick={()=>setvisible(!visible)}>
      { visible ? <VisibilityIcon/>: <VisibilityOffIcon/>}
        </iconbutton>
      </inputAdorment>);
  };
  //i have added a paper to make login box
  
    return (
      <Container
        maxWidth="xs"
        sx={{
          mt: 10,
        }}
      >      <Paper elevation={10} sx={{ padding: '15px',backgroundColor :"rgba(255,255,255,0)"} }> 
        <Stack mb={6} spacing={4} alignItems="center" textAlign="center">
          <ImageEl src={LogoImg} alt="FlowBoard" />
          <Typography color="rgba(255,255,255, .6)">
            Visualize Your Workflow for Increased Productivity.
            <br />
            Access Your Tasks Anytime, Anywhere
          </Typography>
        </Stack>
        <Stack spacing={2}>
          <TextField
            value={form.email}
            name="email"
            onChange={handleChange}
            label="Email"
          />
          <TextField
            value={form.password}
            type ={visible ? "Text":"password"}
            name="password"
            onChange={handleChange}
            InputProps= {{
              endAdornment: <EndAdornment visible={visible} setvisible={setvisible}/>,
              }}
            label="Password"
          />
          <Button
            disabled={loading || !form.email.trim() || !form.password.trim()}
            onClick={handleAuth}
            size="large"
            variant="contained"
          >
            {isLogin ? "Login" : "Register"}
          </Button>
        </Stack>
        <Typography
          sx={{
            cursor: "pointer",
          }}
          onClick={() => setIsLogin((o) => !o)}
          mt={3}
          textAlign="center"
        >
          {authText}
        </Typography>
        </Paper>
      </Container>
    );
  };
  
  export default AuthScreen;