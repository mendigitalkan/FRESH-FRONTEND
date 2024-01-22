/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import {
  Button,
  Card,
  Typography,
  Box,
  TextField,
  Stack,
  Select,
  MenuItem,
  Grid,
  InputLabel,
  FormControl,
  FormGroup,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useHttp } from "../../hooks/http";
import { IProductCreateRequestModel } from "../../models/productsModel";
import { ICategoryModel } from "../../models/categoryModel";
import { handleUploadImageToFirebase } from "../../utilities/uploadImageToFirebase";

export default function CreateProductView() {
  const { handlePostRequest, handleGetRequest } = useHttp();
  const navigate = useNavigate();

  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productImages, setProductImages] = useState<string[]>([]);
  const [productPrice, setProductPrice] = useState(0);
  const [productCategoryId, setProductCategoryId] = useState("");
  const [productStock, setProductStock] = useState(0);
  const [productVariant, setProductVariant] = useState("");

  const [categories, setCategories] = useState<ICategoryModel[]>([]);

  const getCategories = async () => {
    const result = await handleGetRequest({
      path: "/categories",
    });
    setCategories(result.items);
  };

  const handleUploadImage = (event: any) => {
    const image = event.target.files[0];
    handleUploadImageToFirebase({
      selectedFile: image,
      getImageUrl: (image) => setProductImages([...productImages, image]),
    });
  };

  const handleSubmit = async () => {
    try {
      const payload: IProductCreateRequestModel = {
        productName,
        productDescription,
        productImages: JSON.stringify(productImages),
        productPrice,
        productCategoryId,
        productStock,
        productVariant,
      };

      await handlePostRequest({
        path: "/products",
        body: payload,
      });

      navigate("/products");
    } catch (error: unknown) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <Card
      sx={{
        mt: 5,
        p: { xs: 3, md: 5 },
      }}
    >
      <Typography
        variant="h4"
        marginBottom={5}
        color="primary"
        fontWeight={"bold"}
      >
        Tambah Product
      </Typography>

      <Box
        component="form"
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <Typography fontWeight={"bold"} my={2}>
          Info Product
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Nama"
              id="outlined-start-adornment"
              fullWidth
              value={productName}
              type="text"
              onChange={(e) => {
                setProductName(e.target.value);
              }}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              label="Harga: masukan dalam angka tanpa persen (Rp)"
              fullWidth
              id="outlined-start-adornment"
              value={productPrice}
              type="number"
              onChange={(e) => {
                setProductPrice(+e.target.value);
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Diskon: masukan dalam angka tanpa persen (%)"
              fullWidth
              id="outlined-start-adornment"
              value={productPrice}
              type="number"
              onChange={(e) => {
                setProductPrice(+e.target.value);
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Stok"
              fullWidth
              id="outlined-start-adornment"
              value={productStock}
              type="number"
              onChange={(e) => {
                setProductStock(+e.target.value);
              }}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel id="demo-controlled-open-select-label">
                Kategori
              </InputLabel>
              <Select
                labelId="demo-select-small-label"
                id="demo-select-small"
                fullWidth
                value={productCategoryId}
                onChange={(e) => setProductCategoryId(e.target.value)}
              >
                {categories.map((item) => (
                  <MenuItem key={item.categoryId} value={item.categoryId}>
                    {item.categoryName}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>

        <Box sx={{ my: 3 }}>
          <Typography color={"gray"}>Foto Product</Typography>
          <Stack direction={"row"} flexWrap="wrap" spacing={2}>
            <TextField fullWidth type="file" onChange={handleUploadImage} />
            {productImages.map((image, index) => (
              <img
                key={index}
                src={image}
                style={{
                  marginTop: 10,
                  width: 200,
                  height: 200,
                }}
              />
            ))}
          </Stack>
        </Box>

        <Box sx={{ my: 3 }}>
          <Typography fontWeight={"bold"} mb={2}>
            Deskripsi
          </Typography>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Deskripsi"
              id="outlined-start-adornment"
              multiline
              fullWidth
              rows={4}
              value={productDescription}
              type="text"
              onChange={(e) => {
                setProductDescription(e.target.value);
              }}
            />
          </Grid>
        </Box>

        <Box sx={{ mt: 3 }}>
          <Typography fontWeight={"bold"}>Varian Product</Typography>
          <VariantProductSection />
        </Box>

        <Stack direction={"row"} justifyContent="flex-end">
          <Button
            sx={{
              my: 1,
              width: "25ch",
              backgroundColor: "dodgerblue",
              color: "#FFF",
              fontWeight: "bold",
            }}
            variant={"contained"}
            onClick={handleSubmit}
          >
            Submit
          </Button>
        </Stack>
      </Box>
    </Card>
  );
}

interface IVariantTypes {
  type: string;
  values: string[];
}

const VariantProductSection = () => {
  const [variantList, setVariantList] = useState<IVariantTypes[]>([]);

  return (
    <>
      <Typography color={"gray"}>Ukuran</Typography>
      <Stack spacing={2}>
        <FormGroup>
          <Stack direction={"row"} flexWrap={"wrap"} spacing={2}>
            <FormControlLabel
              onChange={(e) => setVariantList([...{ vari }])}
              control={<Checkbox />}
              label="S"
            />
            <FormControlLabel control={<Checkbox />} label="M" />
            <FormControlLabel control={<Checkbox />} label="L" />
            <FormControlLabel control={<Checkbox />} label="XL" />
            <FormControlLabel control={<Checkbox />} label="XXL" />
          </Stack>
        </FormGroup>
        <Typography color={"gray"}>Warna</Typography>
        <FormGroup>
          <Stack direction={"row"} flexWrap={"wrap"} spacing={2}>
            <FormControlLabel control={<Checkbox />} label="Hitam" />
            <FormControlLabel control={<Checkbox />} label="Merah" />
            <FormControlLabel control={<Checkbox />} label="Putih" />
            <FormControlLabel control={<Checkbox />} label="Kuning" />
            <FormControlLabel control={<Checkbox />} label="Hijau" />
            <FormControlLabel control={<Checkbox />} label="Biru" />
            <FormControlLabel control={<Checkbox />} label="Abu-Abu" />
          </Stack>
        </FormGroup>
        <Typography color={"gray"}>Kondisi</Typography>
        <FormGroup>
          <Stack direction={"row"} flexWrap={"wrap"} spacing={2}>
            <FormControlLabel control={<Checkbox />} label="Baru" />
            <FormControlLabel control={<Checkbox />} label="Bekas" />
          </Stack>
        </FormGroup>
        <Typography color={"gray"}>Berat</Typography>
        <TextField
          label="Berat: masukan angkat dalam gram tanpa (g)"
          id="outlined-start-adornment"
          type="number"
        />
      </Stack>
    </>
  );
};
