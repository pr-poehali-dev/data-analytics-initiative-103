import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/hooks/use-toast";
import Icon from "@/components/ui/icon";

// Имена пары и ключевые данные о свадьбе — меняются в одном месте
const WEDDING = {
  bride: "Анна",
  groom: "Дмитрий",
  date: "12 сентября 2026",
  time: "16:00",
  place: "Усадьба «Зелёный Сад», Подмосковье",
  dressCode: "Изумрудный и золотой",
};

// Варианты горячего блюда
const MAIN_DISHES = [
  { value: "beef", label: "Говядина", desc: "Медальоны с трюфельным соусом" },
  { value: "salmon", label: "Лосось", desc: "Запечённый с овощами гриль" },
  { value: "veg", label: "Вегетарианское", desc: "Ризотто с белыми грибами" },
];

// Варианты напитков (множественный выбор)
const DRINKS = ["Вода", "Сок", "Вино", "Шампанское"];

const Index = () => {
  const { toast } = useToast();

  // Состояние формы RSVP
  const [name, setName] = useState("");
  const [attending, setAttending] = useState("yes");
  const [dish, setDish] = useState("");
  const [drinks, setDrinks] = useState<string[]>([]);
  const [allergy, setAllergy] = useState("");
  const [submitted, setSubmitted] = useState(false);

  // Переключение напитка в чекбоксах
  const toggleDrink = (drink: string) => {
    setDrinks((prev) =>
      prev.includes(drink) ? prev.filter((d) => d !== drink) : [...prev, drink]
    );
  };

  // Отправка формы
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      toast({ title: "Укажите имя и фамилию", variant: "destructive" });
      return;
    }
    if (attending === "yes" && !dish) {
      toast({ title: "Выберите горячее блюдо", variant: "destructive" });
      return;
    }
    setSubmitted(true);
    toast({ title: "Спасибо, ваш ответ сохранён!" });
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Навигация */}
      <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="font-display text-2xl font-bold tracking-tight">
              {WEDDING.bride} <span className="text-accent">&</span> {WEDDING.groom}
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a href="#details" className="text-muted-foreground hover:text-foreground transition-colors">
                Детали
              </a>
              <a href="#story" className="text-muted-foreground hover:text-foreground transition-colors">
                Наша история
              </a>
              <a href="#menu" className="text-muted-foreground hover:text-foreground transition-colors">
                Меню
              </a>
              <a href="#rsvp" className="text-muted-foreground hover:text-foreground transition-colors">
                RSVP
              </a>
            </div>
            <Button variant="outline" size="sm" asChild>
              <a href="#rsvp">Подтвердить</a>
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero — главный экран */}
      <section className="pt-20 pb-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 min-h-[80vh]">
            <div className="lg:col-span-7 flex flex-col justify-center animate-fade-in">
              <div className="space-y-8">
                <div className="space-y-4">
                  <Badge variant="secondary" className="w-fit">
                    <Icon name="Heart" className="w-3 h-3 mr-1" />
                    Приглашение на свадьбу
                  </Badge>
                  <h1 className="font-display text-6xl lg:text-8xl font-bold tracking-tight text-balance">
                    {WEDDING.bride}
                    <span className="text-accent block">& {WEDDING.groom}</span>
                  </h1>
                  <p className="text-xl text-muted-foreground max-w-2xl text-pretty">
                    Мы рады разделить с вами самый важный день нашей жизни.
                    Приглашаем вас стать частью этого волшебного вечера среди зелени и тёплого света.
                  </p>
                  <div className="flex items-center gap-3 text-2xl font-display text-primary">
                    <Icon name="Calendar" className="w-6 h-6" />
                    {WEDDING.date}
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button size="lg" className="text-lg px-8" asChild>
                    <a href="#rsvp">Подтвердить присутствие</a>
                  </Button>
                  <Button variant="outline" size="lg" className="text-lg px-8 bg-transparent" asChild>
                    <a href="#details">Детали события</a>
                  </Button>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 self-center">
              <Card className="aspect-[4/5] bg-card overflow-hidden rounded-lg">
                <img
                  src="https://cdn.poehali.dev/projects/30b02276-cce8-4364-90c2-d710008f0326/files/865f7464-9048-43c4-9694-134ad3d1077a.jpg"
                  alt="Анна и Дмитрий"
                  className="w-full h-full object-cover"
                />
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Детали события */}
      <section id="details" className="py-20 bg-secondary/50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl font-bold mb-4">ДЕТАЛИ ТОРЖЕСТВА</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-balance">
              Всё, что нужно знать, чтобы провести этот вечер вместе с нами
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <Card className="p-8 text-center">
              <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Icon name="Calendar" className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-display text-xl font-bold mb-2">Дата</h3>
              <p className="text-muted-foreground">{WEDDING.date}</p>
            </Card>
            <Card className="p-8 text-center">
              <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Icon name="Clock" className="w-8 h-8 text-accent" />
              </div>
              <h3 className="font-display text-xl font-bold mb-2">Время</h3>
              <p className="text-muted-foreground">Сбор гостей в {WEDDING.time}</p>
            </Card>
            <Card className="p-8 text-center">
              <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Icon name="MapPin" className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-display text-xl font-bold mb-2">Место</h3>
              <p className="text-muted-foreground">{WEDDING.place}</p>
            </Card>
            <Card className="p-8 text-center">
              <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Icon name="Shirt" className="w-8 h-8 text-accent" />
              </div>
              <h3 className="font-display text-xl font-bold mb-2">Дресс-код</h3>
              <p className="text-muted-foreground">{WEDDING.dressCode}</p>
            </Card>
          </div>
        </div>
      </section>

      {/* Наша история */}
      <section id="story" className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative order-2 lg:order-1">
              <Card className="aspect-[4/5] overflow-hidden">
                <img
                  src="https://cdn.poehali.dev/projects/30b02276-cce8-4364-90c2-d710008f0326/files/ffa16ee8-dcd6-4a22-ab06-7693a9571182.jpg"
                  alt="Сервировка свадебного стола"
                  className="w-full h-full object-cover"
                />
              </Card>
            </div>
            <div className="order-1 lg:order-2">
              <Badge variant="secondary" className="mb-4">
                <Icon name="Heart" className="w-3 h-3 mr-1" />
                Наша история
              </Badge>
              <h2 className="font-display text-4xl font-bold mb-6 text-balance">
                Как всё начиналось
              </h2>
              <div className="space-y-6 text-lg text-muted-foreground">
                <p>
                  Мы встретились однажды осенним вечером в маленькой кофейне с живой музыкой.
                  Один общий плейлист, бесконечный разговор до закрытия — и стало ясно, что
                  это начало чего-то большого.
                </p>
                <p>
                  За эти годы мы прошли вместе многое: путешествия, переезды, мечты и планы.
                  И вот настал день, когда мы хотим сказать друг другу «да» — в окружении самых
                  близких людей. Спасибо, что будете рядом.
                </p>
              </div>
              <div className="mt-8 grid grid-cols-2 gap-8">
                <div>
                  <div className="font-display text-3xl font-bold text-primary">5 лет</div>
                  <div className="text-muted-foreground">вместе</div>
                </div>
                <div>
                  <div className="font-display text-3xl font-bold text-accent">1 день</div>
                  <div className="text-muted-foreground">который изменит всё</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Меню — выбор позиций */}
      <section id="menu" className="py-20 bg-secondary/30">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl font-bold mb-4">МЕНЮ ВЕЧЕРА</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-balance">
              Выбрать своё горячее блюдо вы сможете в форме подтверждения ниже
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {MAIN_DISHES.map((d) => (
              <Card key={d.value} className="p-8 text-center">
                <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Icon name="UtensilsCrossed" className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-display text-2xl font-bold mb-2">{d.label}</h3>
                <p className="text-muted-foreground">{d.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Форма RSVP */}
      <section id="rsvp" className="py-20">
        <div className="max-w-2xl mx-auto px-6">
          <div className="text-center mb-10">
            <h2 className="font-display text-4xl font-bold mb-4">ПОДТВЕРДИТЕ ПРИСУТСТВИЕ</h2>
            <p className="text-xl text-muted-foreground text-balance">
              Пожалуйста, заполните форму до 1 августа 2026
            </p>
          </div>

          <Card className="p-8">
            {submitted ? (
              <div className="text-center py-12 animate-fade-in">
                <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Icon name="CheckCheck" className="w-10 h-10 text-primary" />
                </div>
                <h3 className="font-display text-3xl font-bold mb-3">Спасибо!</h3>
                <p className="text-muted-foreground text-lg">
                  Ваш ответ сохранён. Мы с нетерпением ждём встречи с вами!
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Имя и фамилия */}
                <div className="space-y-2">
                  <Label htmlFor="name">Имя и фамилия *</Label>
                  <Input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Иван Иванов"
                  />
                </div>

                {/* Присутствие */}
                <div className="space-y-3">
                  <Label>Сможете ли вы присутствовать?</Label>
                  <RadioGroup value={attending} onValueChange={setAttending} className="flex gap-6">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="yes" id="att-yes" />
                      <Label htmlFor="att-yes" className="font-normal cursor-pointer">Да, буду</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="no" id="att-no" />
                      <Label htmlFor="att-no" className="font-normal cursor-pointer">К сожалению, нет</Label>
                    </div>
                  </RadioGroup>
                </div>

                {attending === "yes" && (
                  <>
                    {/* Горячее блюдо */}
                    <div className="space-y-3">
                      <Label>Выбор горячего блюда</Label>
                      <RadioGroup value={dish} onValueChange={setDish} className="space-y-2">
                        {MAIN_DISHES.map((d) => (
                          <div key={d.value} className="flex items-center space-x-2">
                            <RadioGroupItem value={d.value} id={`dish-${d.value}`} />
                            <Label htmlFor={`dish-${d.value}`} className="font-normal cursor-pointer">
                              {d.label} <span className="text-muted-foreground">— {d.desc}</span>
                            </Label>
                          </div>
                        ))}
                      </RadioGroup>
                    </div>

                    {/* Напитки */}
                    <div className="space-y-3">
                      <Label>Напитки</Label>
                      <div className="grid grid-cols-2 gap-3">
                        {DRINKS.map((drink) => (
                          <div key={drink} className="flex items-center space-x-2">
                            <Checkbox
                              id={`drink-${drink}`}
                              checked={drinks.includes(drink)}
                              onCheckedChange={() => toggleDrink(drink)}
                            />
                            <Label htmlFor={`drink-${drink}`} className="font-normal cursor-pointer">
                              {drink}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Аллергии */}
                    <div className="space-y-2">
                      <Label htmlFor="allergy">Аллергии или пожелания</Label>
                      <Textarea
                        id="allergy"
                        value={allergy}
                        onChange={(e) => setAllergy(e.target.value)}
                        placeholder="Например: аллергия на орехи"
                      />
                    </div>
                  </>
                )}

                <Button type="submit" size="lg" className="w-full text-lg">
                  Отправить
                </Button>
              </form>
            )}
          </Card>
        </div>
      </section>

      {/* Подвал */}
      <footer className="bg-secondary/50 py-16">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="font-display text-3xl font-bold mb-4">
            {WEDDING.bride} <span className="text-accent">&</span> {WEDDING.groom}
          </div>
          <p className="text-muted-foreground mb-6 max-w-md mx-auto">
            С любовью ждём вас {WEDDING.date} в {WEDDING.place}
          </p>
          <div className="flex gap-4 justify-center">
            <Button variant="outline" size="sm">
              <Icon name="MapPin" className="w-4 h-4 mr-2" />
              Как добраться
            </Button>
            <Button variant="outline" size="sm">
              <Icon name="Phone" className="w-4 h-4 mr-2" />
              Связаться
            </Button>
          </div>
          <div className="border-t border-border mt-12 pt-8 text-muted-foreground">
            <p>&copy; 2026 {WEDDING.bride} & {WEDDING.groom}. Сделано с любовью.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
