import { useState, useEffect, useRef } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { Form, InputGroup, Row, Col, Spinner, Container } from "react-bootstrap"

import productService from "../../services/productService"
import TuCard from "../../components/common/TuCard"
import TuButton from "../../components/common/TuButton"
import TuLoader from "../../components/common/TuLoader"
import { getFileFromUrl } from "../../utils/writeUtils";

function EditProduct() {
  // HOOK: SETTING COMPONENT STATE (& init values)
  const params = useParams();
  const navigate = useNavigate();
  const [productData, setProductData] = useState({
    id: params.id,
    name: "",
    description: "",
    category: "",
    price: 0,
    sizes: "",
    texture: "",
    onSale: false,
    isAvailable: true,
    image: ""
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [uploadedFile, setUploadedFile] = useState("");
  const [preview, setPreview] = useState(true)
  
  const { id, name, description, category, price, sizes, texture, onSale, isAvailable, image } = productData;

  const effectRan = useRef(false);
  useEffect(() => {
    if (effectRan.current === false) {
      fetchProduct();
      setLoading(false);

      // CLEAN UP FUNCTION
      return () => {
        effectRan.current = true;
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]); 

  async function fetchProduct(){
    try {
      const response = await productService.getById(id);
      const dbProduct = await response.data;
      console.log(dbProduct)

      setProductData(productOnMount => ({
        ...productOnMount,
        ...dbProduct
      }))

      //New Save file string to state
      if(!dbProduct.image){
        console.log("no download url provided by DB")
      } else {
        const fileGlob = getFileFromUrl(dbProduct.image);
        setUploadedFile(fileGlob);
      }

    } catch(err) {
      console.log(err?.response);
      setError(true)
    }
  }

  // Destructure data state nested object properties & instance of useNavigate class

  // FORM FUNCTIONS
  // [1] handleTextChange will handle change in state value event for TEXT data
  // NOTE: To update state object, we create shallow copy & mutate properties according to input field changed
  const handleTextChange = (e) => {
    const { name, value } = e.target;
    setProductData({ ...productData, [name]: value });
  }

  // [2] handleFileChange will handle change in state for FILE data
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setProductData({ ...productData, image: file });
    setPreview(false);
  }  

  // [3] handleSubmit will control form submission event
  const handleSubmit = async (e) => {
    e.preventDefault();      
    setLoading(true);
    try {
      // API Post (refactored)
    //   const response = await productService.post(productData);
    const response = await productService.put(id, productData, uploadedFile);
    console.log(response);
    navigate('/store/products')
     

    } catch (err) {
      console.log(err?.response);
      window.scroll({top: 0, left: 0, behavior: 'smooth' });
      setTimeout(() => {setLoading(false)}, 1000);
    }
  };

  if (error) {
    return (
      <Container className="text-center mt-4">
        <p>Error page</p>
      </Container>
    )
  }

  // CONDITIONAL LOAD: LOADING
  if (loading) {
    return (
      <Container className="text-center mt-4">
        <TuLoader />
      </Container>
    )
  }

  return (
    <TuCard title="Edit Product">
      <Form onSubmit={ handleSubmit }>
        {/* GROUP 1: NAME */}
        <Form.Group className="mb-3">
          <Form.Label>Product name</Form.Label>
          <Form.Control 
            type="text"
            placeholder="Enter item name" 
            name="name"
            value={name}
            onChange={ handleTextChange }
          />
        </Form.Group>

        {/* GROUP 2: DESCRIPTION */}
        <Form.Group className="mb-3">
          <Form.Label>Product description</Form.Label>
          <Form.Control type="text" placeholder="Enter product description" name="description" value={description} onChange={ handleTextChange } />
        </Form.Group>

        {/* GROUP 3: CATEGORY */}
        <Form.Group className="mb-3">
          <Form.Label>Item category</Form.Label>
          <Form.Control 
            as='select'
            name='category'
            value={category}
            onChange={ handleTextChange }
          >
             <option value="">Choose Your Product Category</option>
            <option value="Kits">Kits</option>
            <option value="Training">Training</option>
            <option value="Apparel">Apparel</option>
          </Form.Control>
        </Form.Group>

        {/* GROUP 4: PRODUCT DETAILS */}
        <Form.Group className="mb-3">
          <Row>
            {/* 4A: PRICE */}
            <Col lg={4} md={4} sm={12}>
              <Form.Label>Product price</Form.Label>
              <InputGroup>          
                <InputGroup.Text id="price-dollar">$</InputGroup.Text>
                <Form.Control type="number" aria-describedby="price-dollar" id="price-input" name="price" placeholder="0" value={price} onChange={ handleTextChange } />
              </InputGroup>
            </Col>

            <Col lg={4} md={4} sm={12}>
              <Form.Label>Product sizing range</Form.Label>
              <Form.Control 
                as='select'
                name='sizes'
                value={sizes}
                onChange={ handleTextChange }
              >
                <option value="">Choose Size</option>
                <option value="range">XS to XL</option>
                <option value="single">One Size Fits All</option>
              </Form.Control>
            </Col>

            {/* 4C: TEXTURE */}
            <Col lg={4} md={4} sm={12}>
              <Form.Label>Product texture</Form.Label>
              <Form.Control type="text" placeholder="Enter product texture" name="texture" value={texture} onChange={ handleTextChange } />
            </Col>
          {/* END OF PRODUCT DETAILS ROW */}

           
          {/* END OF PRODUCT DETAILS ROW */}
          </Row>
        </Form.Group>

        {/* GROUP 5: PRODUCT SALE DETAILS */}
        <Form.Group className="mb-3">
          <Row>
            
            {/* 5B: IS AVAILABLE */}
            <Col lg={6} md={6} sm={12}>
              <Form.Label>Product availability</Form.Label>
              <Form.Control 
                as='select'
                name='isAvailable'
                value={isAvailable}
                onChange={ handleTextChange }
              >
                <option value={true}>In Stock</option>
                <option value={false}>Out of Stock</option>
              </Form.Control>
            </Col>
             {/* 5C: IS ON SALE */}
             <Col lg={6} md={6} sm={12}>
              <Form.Label>On Sale</Form.Label>
              <Form.Control 
                as='select'
                name='onSale'
                value={onSale}
                onChange={ handleTextChange }
              >
                <option value={true}>On Sale</option>
                <option value={false}>Retail Price</option>
              </Form.Control>
            </Col>
          {/* END OF PRODUCT SALE DETAILS ROW */}
          </Row>
        </Form.Group>

        {preview && !loading ? 
        <div>         
            <h6>Current Image</h6><img style={{ width: "20%", margin: "1rem auto", opacity: 0.7 }} src={image} alt={`preview-${name}`}/>
        </div>
        : null
        }


        {/* GROUP 6: PRODUCT IMAGE */}
        <Form.Group className="mb-3" controlId="image">
          <Form.Label>Product image</Form.Label>
          <Form.Control 
            type="file"
            className="mb-4"
            onChange={ handleFileChange }
          />
        </Form.Group>

        {/* SUBMIT BUTTON */}
        <TuButton loadingState={loading}>
          {loading ? <Spinner
            as="span"
            animation="border"
            size="sm"
            role="status"
            aria-hidden="true"
          /> : 'Submit'}
        </TuButton>
      </Form>
    </TuCard>
  )
}

export default EditProduct