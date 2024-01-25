/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react'
import { Typography, Stack, FormGroup, FormControlLabel, Checkbox } from '@mui/material'

interface IVariantProductModel {
  setProductColors: (value: string[]) => void
  setProductSizes: (value: string[]) => void
}

export default function VariantProductSection(props: IVariantProductModel) {
  const [colors, setColors] = useState<string[]>([])
  const [sizes, setSizes] = useState<string[]>([])

  const handleSelectColor = (inputColor: string) => {
    if (colors.includes(inputColor)) {
      const newColors = colors.filter((color) => color !== inputColor)
      setColors(newColors)
    } else {
      setColors([...colors, inputColor])
    }
  }

  const handleSelectSizes = (inputValue: string) => {
    if (sizes.includes(inputValue)) {
      const newSizes = sizes.filter((size) => size !== inputValue)
      setSizes(newSizes)
    } else {
      setSizes([...sizes, inputValue])
    }
  }

  useEffect(() => {
    props.setProductColors(colors)
    props.setProductSizes(sizes)
  }, [colors, sizes, props])

  return (
    <>
      <Typography color={'gray'}>Ukuran</Typography>
      <Stack spacing={2}>
        <FormGroup>
          <Stack direction={'row'} flexWrap={'wrap'} spacing={2}>
            <FormControlLabel
              control={
                <Checkbox
                  value={'S'}
                  onChange={(e) => handleSelectSizes(e.target.value)}
                />
              }
              label='S'
            />
            <FormControlLabel
              control={
                <Checkbox
                  value={'M'}
                  onChange={(e) => handleSelectSizes(e.target.value)}
                />
              }
              label='M'
            />
            <FormControlLabel
              control={
                <Checkbox
                  value={'L'}
                  onChange={(e) => handleSelectSizes(e.target.value)}
                />
              }
              label='L'
            />
            <FormControlLabel
              control={
                <Checkbox
                  value={'XL'}
                  onChange={(e) => handleSelectSizes(e.target.value)}
                />
              }
              label='XL'
            />
            <FormControlLabel
              control={
                <Checkbox
                  value={'XXL'}
                  onChange={(e) => handleSelectSizes(e.target.value)}
                />
              }
              label='XXL'
            />
          </Stack>
        </FormGroup>
        <Typography color={'gray'}>Warna</Typography>
        <FormGroup>
          <Stack direction={'row'} flexWrap={'wrap'} spacing={2}>
            <FormControlLabel
              control={
                <Checkbox
                  value={'Hitam'}
                  onChange={(e) => handleSelectColor(e.target.value)}
                />
              }
              label='Hitam'
            />
            <FormControlLabel
              control={
                <Checkbox
                  value={'Merah'}
                  onChange={(e) => handleSelectColor(e.target.value)}
                />
              }
              label='Merah'
            />
            <FormControlLabel
              control={
                <Checkbox
                  value={'Putih'}
                  onChange={(e) => handleSelectColor(e.target.value)}
                />
              }
              label='Putih'
            />
            <FormControlLabel
              control={
                <Checkbox
                  value={'Kuning'}
                  onChange={(e) => handleSelectColor(e.target.value)}
                />
              }
              label='Kuning'
            />
            <FormControlLabel
              control={
                <Checkbox
                  value={'Hijau'}
                  onChange={(e) => handleSelectColor(e.target.value)}
                />
              }
              label='Hijau'
            />
            <FormControlLabel
              control={
                <Checkbox
                  value={'Biru'}
                  onChange={(e) => handleSelectColor(e.target.value)}
                />
              }
              label='Biru'
            />
            <FormControlLabel
              control={
                <Checkbox
                  value={'Abu-Abu'}
                  onChange={(e) => handleSelectColor(e.target.value)}
                />
              }
              label='Abu-Abu'
            />
          </Stack>
        </FormGroup>
      </Stack>
    </>
  )
}
