import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import Hello from "./Hello";
import TagList from "./Tag/TagList";
import { TagForm } from "./Tag/TagForm";
import { TagEdit } from "./Tag/TagEdit";
import { TagDelete } from './Tag/TagDelete';

export default function ApplicationViews({ isLoggedIn }) {
  return (
    <main>
      <Routes>
        <Route path="/">
          <Route
            index
            element={isLoggedIn ? <Hello /> : <Navigate to="/login" />}
          />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="tag" element={<TagList />} />
          <Route path="tag/create" element={<TagForm />} />
          <Route path="tag/edit/:id" element={<TagEdit />} />
          <Route path="tag/delete/:id" element={<TagDelete />} />
        </Route>
      </Routes>
    </main>
  );
};
