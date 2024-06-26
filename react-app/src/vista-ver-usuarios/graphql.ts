import { gql } from '@apollo/client';

export const GET_USUARIOS = gql`
  query GetUsuarios {
    getUsuarios {
      id
      usuario
      pass
      nombre
      rut
      mail
      nrol
    }
  }
`;

export const GET_ROLES = gql`
  query GetRoles {
    getRoles {
        id
        rol
        nrol
    }
  }
`;

export const ADD_USUARIO = gql`
  mutation AddUsuario($insertUsuario: NuevoUsuario!) {
    addUsuario(input: $insertUsuario) {
      id
      usuario
      pass
      nombre
      rut
      mail
      nrol
    }
  }
`;

export const UPDATE_USUARIO = gql`
  mutation UpdateUsuario($rut: String!, $modUsuario: CambioUsuario!) {
    updateUsuario(rut: $rut, input: $modUsuario) {
      id
      usuario
      pass
      nombre
      rut
      mail
      nrol
    }
  }
`;

export const DELETE_USUARIO = gql`
  mutation DeleteUsuario($rut: String!) {
    deleteUsuario(rut: $rut) {
      id
      mensaje
    }
  }
`;