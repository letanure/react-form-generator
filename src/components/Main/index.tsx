import * as S from './styles'
import { useState } from 'react'

const formConfig: FormConfig = {
  title: 'My form',
  fields: [
    {
      label: 'Placeholder text',
      placeholder: 'Placeholder test',
      name: 'namePlaceholder',
      type: 'text',
      value: ''
    },
    {
      label: 'Color',
      name: 'nameColor',
      type: 'color',
      value: '#ff0000'
    },
    {
      label: 'Email',
      name: 'nameEmail',
      type: 'email',
      value: 'aa@bb.cc'
    },
    {
      label: 'Number',
      name: 'nameNumber',
      type: 'number',
      value: '1'
    },
    {
      label: 'Password',
      name: 'namePassword',
      type: 'password',
      value: '123456'
    },
    {
      label: 'tel',
      name: 'nameTel',
      type: 'tel',
      value: '111222333'
    },
    {
      label: 'Text',
      name: 'nameText',
      type: 'text',
      value: 'my text'
    },
    {
      label: 'Time',
      name: 'nameTime',
      type: 'time',
      value: '12:00'
    },
    {
      label: 'URL',
      name: 'nameUrl',
      type: 'url',
      value: 'https://www.google.com'
    },
    {
      label: 'Datetime',
      name: 'nameDatetime',
      type: 'datetime-local',
      value: '2020-01-01T12:00'
    },
    {
      label: 'Hidden',
      name: 'nameHidden',
      type: 'hidden',
      value: '9'
    },
    {
      label: 'Month',
      name: 'nameMonth',
      type: 'month',
      value: '2020-01'
    },
    {
      label: 'Search',
      name: 'nameSearch',
      type: 'search',
      value: 'my search'
}

const Main = ({ title = 'React Form Generator' }: Props) => (
  <S.Wrapper>
    <S.Logo src="/img/icon-512.png" alt="Atom image." />
    <S.Title>{title}</S.Title>
  </S.Wrapper>
)

export default Main
