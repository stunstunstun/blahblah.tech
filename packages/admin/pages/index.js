import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Mutation } from 'react-apollo'
import { SIGN_UP } from '../mutations'

const Title = styled.h1`
  color: red;
  font-size: 50px;
`
class App extends React.Component {
  static propTypes = {
    code: PropTypes.string,
    onLogin: PropTypes.func.isRequired,
  }

  static async getInitialProps({ query }) {
    return { ...query }
  }

  componentDidMount() {
    const { code } = this.props
    if (code) this.signup()
  }

  render() {
    const { code, onLogin } = this.props
    return (
      <Mutation mutation={SIGN_UP} variables={{ code }} onCompleted={onLogin}>
        {(signup, { loading }) => {
          this.signup = signup
          if (loading) return <p>Loading...</p>
          return (
            <>
              <Title>Hello World!</Title>
            </>
          )
        }}
      </Mutation>
    )
  }
}

export default App
