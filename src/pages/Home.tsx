import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Form } from 'react-bootstrap';
import { useGeneralContext } from '../context/GeneralContext';
import { getFromStorage } from '../helpers/localStorage';
import logo from '../logo-with-title.png';
import '../styles/Home.scss';
import { IUser } from '../interfaces/user';

const Home: React.FC = () => {
  const navigate = useNavigate();

  const ctx = useGeneralContext();
  const [name, setName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    ctx.handleLogin(name);
    navigate('/foods');
  };

  useEffect(() => {
    const user = getFromStorage<IUser>('user');
    if (user && user.name) {
      navigate('/foods');
    }
  }, [navigate]);

  return (
    <div className="home-page text-light d-flex flex-column">
      <img className="home-page__logo mt-5 align-self-center" src={logo} alt="Recipes App logo" />
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mt-4 mb-3" controlId="name">
          <Form.Label>What is your name?</Form.Label>
          <Form.Control
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoComplete="new-password"
          />
        </Form.Group>
        <Button className="w-100" type="submit" variant="outline-light" disabled={name.length < 2}>
          Enter
        </Button>
      </Form>
    </div>
  );
};

export { Home };
