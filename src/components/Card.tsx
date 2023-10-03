import { CardActionArea } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Link from "next/link";

interface Props {
  title: string;
  description: string;
  imageUrl: string | null;
  href: string;
}

const ProductCard = ({ title, description, imageUrl, href }: Props) => {
  return (
    <Link href={href} style={{ textDecoration: "none" }}>
      <Card sx={{ maxWidth: 200, maxHeight: 250 }}>
        <CardActionArea>
          <CardMedia
            component="img"
            height="140"
            image={imageUrl || ""}
            alt={title}
            sx={{ objectFit: "contain" }}
          />
          <CardContent>
            <Typography
              gutterBottom
              variant="h6"
              component="div"
              align="center"
            >
              {title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {description}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Link>
  );
};

export default ProductCard;
